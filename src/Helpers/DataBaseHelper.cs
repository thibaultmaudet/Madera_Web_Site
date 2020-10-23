using Madera.Contracts.Services;
using Madera.Models.Settings;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.ObjectModel;
using System.Data.Common;
using System.Data.SqlClient;

namespace Madera.Helpers
{
    public class DataBaseHelper : IDataBaseHelper
    {
        private readonly IOptions<DataBase> dataBase;

        private SqlConnection sqlConnection;

        public DataBaseHelper(IOptions<DataBase> dataBase)
        {
            this.dataBase = dataBase;

            OpenConnection();
        }

        public SqlDataReader Query(string request)
        {
            try
            {
                #pragma warning disable CA2100
                using SqlCommand command = new SqlCommand(request, sqlConnection);
                return command.ExecuteReader();
            }
            catch (SqlException sqlException)
            {
                throw sqlException;
            }
        }

        // TODO -> Implement return for only one object, return directly the value at the specified type.
        public T QueryForObject<T>(string request)
        {
            throw new NotImplementedException();

            /*try
            {
                #pragma warning disable CA2100
                using SqlCommand command = new SqlCommand(request, sqlConnection);
                using SqlDataReader sqlDataReader = command.ExecuteReader();

                if (sqlDataReader.FieldCount == 1)
                {
                    ReadOnlyCollection<DbColumn> columns = sqlDataReader.GetColumnSchema();

                    /*if (columns.Count == 1)
                        return (T)sqlDataReader.GetValues
                    else
                    {
                        dynamic sqlObject = new object();

                        foreach (DbColumn dbColumn in columns)
                        {
                            sqlObject[dbColumn.ColumnOrdinal] = sqlDataReader.GetValue((int)dbColumn.ColumnOrdinal);
                        }

                        return (T)sqlObject;
                    }
                    Object[] values = new Object[reader.FieldCount];
                    
                    return (T)sqlDataReader.GetValues(values);
                }
                else
                    throw new Exception();
            }
            catch (SqlException sqlException)
            {
                throw sqlException;
            }*/
        }

        private void OpenConnection()
        {
            try
            {
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder { DataSource = dataBase.Value.HostName, UserID = dataBase.Value.Username, Password = dataBase.Value.Password, InitialCatalog = string.Empty };

                sqlConnection = new SqlConnection(builder.ConnectionString);
                
                sqlConnection.Open();
            }
            catch (SqlException sqlException)
            {
                throw sqlException;
            }
        }
    }
}