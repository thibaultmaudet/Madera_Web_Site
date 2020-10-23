using Madera.Contracts.Services;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

namespace Madera.Helpers
{
    public class NamedQueryHelper : INamedQueryHelper
    {
        private class NamedQueryCache
        {
            private bool reloadable = true;

            private Dictionary<string, string> queries = new Dictionary<string, string>();

            private DateTime lastDateModification;

            public Dictionary<string, string> Queries { get => queries; }

            public void ParseFile(string filePath)
            {
                if (!reloadable)
                    return;

                // TODO -> Support embedded ressource

                DateTime lastModification = new DateTime();

                if (File.Exists(filePath))
                    lastModification = File.GetLastWriteTime(filePath);
                else
                    reloadable = false;

                if (lastModification > lastDateModification)
                {
                    lastDateModification = lastModification;

                    try
                    {
                        _logger.LogInformation("(Re)loading queries include in " + filePath);

                        StreamReader streamReader = new StreamReader(filePath);
                        StringBuilder stringBuilder = new StringBuilder();

                        try
                        {
                            string line = null;
                            string currentQueryName = null;

                            while ((line = streamReader.ReadLine()) != null)
                            {
                                string trimmedLine = line.Trim();

                                if (currentQueryName != null && trimmedLine.Length > 0 && !trimmedLine.StartsWith("--"))
                                {
                                    if (stringBuilder.Length > 0)
                                        stringBuilder.Append("\n");
                                    stringBuilder.Append(line);
                                }

                                if (trimmedLine.StartsWith("--") && trimmedLine.Substring(2).Trim().StartsWith("@"))
                                {
                                    if (currentQueryName != null)
                                        queries.Add(currentQueryName, stringBuilder.ToString());

                                    currentQueryName = line.Substring(2).Trim().Substring(1).Trim();
                                    stringBuilder = new StringBuilder();
                                }
                            }

                            if (currentQueryName != null)
                                queries.Add(currentQueryName, stringBuilder.ToString());

                        }
                        catch (IOException ioException)
                        {
                            throw new Exception("Error when reading file : " + filePath, ioException);
                        }
                        finally
                        {
                            if (queries.Count > 0)
                                _logger.LogInformation("Queries loaded : " + string.Join("; ", queries.Keys));

                            try
                            {
                                if (streamReader != null)
                                    streamReader.Close();
                            }
                            catch (Exception e)
                            {
                                _logger.LogError(e.StackTrace);
                            }
                        }
                    }
                    catch (IOException exception)
                    {
                        throw new Exception("Error when reading file : " + filePath, exception);
                    }
                }
            }

        }
        
        private static ILogger _logger;

        private readonly static Dictionary<string, NamedQueryCache> queryCache = new Dictionary<string, NamedQueryCache>();

        private DataBaseHelper dataBaseHelper;

        private string sql;

        public NamedQueryHelper()
        {
        }

        public NamedQueryHelper(ILogger logger, DataBaseHelper dataBaseHelper, string queryName, string filePath)
        {
            _logger = logger;

            this.dataBaseHelper = dataBaseHelper;

            if (string.IsNullOrEmpty(queryName))
                throw new ArgumentNullException("queryName");

            NamedQueryCache cache = null;

            lock (queryCache)
            {
                queryCache.TryGetValue(filePath, out cache);

                if (cache == null)
                {
                    cache = new NamedQueryCache();
                    queryCache.Add(filePath, cache);
                }
            }

            cache.ParseFile(filePath);

            sql = cache.Queries.GetValueOrDefault(queryName);

            logger.LogInformation(sql);
        }
       
        public SqlDataReader Query()
        {
            return dataBaseHelper.Query(sql);
        }
    }
}
