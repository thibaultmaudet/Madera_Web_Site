using Madera.Helpers;
using Madera.Models;
using Madera.Models.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Text;

namespace Madera.Controllers
{
    [ApiController]
    [Route("/api/clients/[action]")]
    public class ClientsController
    {
        private readonly ILogger<ClientsController> logger;

        private readonly IOptions<DataBase> dataBaseOptions;

        private readonly string basePath;

        public ClientsController(ILogger<ClientsController> logger, IOptions<DataBase> dataBaseOptions, IHostEnvironment hostEnvironment)
        {
            this.logger = logger;

            this.dataBaseOptions = dataBaseOptions;

            basePath = hostEnvironment.ContentRootPath;
        }

        [HttpGet]
        public List<Client> GetClientsInformations()
        {
            SqlDataReader sqlDataReader = new NamedQueryHelper(logger, new DataBaseHelper(dataBaseOptions), "getClientsInformations", Path.Combine(basePath, "queries.sql")).Query();

            logger.LogInformation("Get clients informations.");

            List<Client> clients = new List<Client>();

            while (sqlDataReader.Read())
            {
                clients.Add(new Client() { Name = sqlDataReader.GetString(sqlDataReader.GetOrdinal("NOM_CLIENT")), IdClient = sqlDataReader.GetInt32(sqlDataReader.GetOrdinal("ID_CLIENT")), City = sqlDataReader.GetString(sqlDataReader.GetOrdinal("VILLE_CLIENT")), Country = sqlDataReader.GetString(sqlDataReader.GetOrdinal("PAYS_CLIENT")), Mail = sqlDataReader.GetString(sqlDataReader.GetOrdinal("EMAIL_CLIENT")), Mobile = sqlDataReader.GetString(sqlDataReader.GetOrdinal("MOBILE_CLIENT")), Phone = sqlDataReader.GetString(sqlDataReader.GetOrdinal("TELEPHONE_CLIENT")), Street = sqlDataReader.GetString(sqlDataReader.GetOrdinal("RUE_CLIENT")), ZipCode = sqlDataReader.GetString(sqlDataReader.GetOrdinal("CODE_POSTAL_CLIENT")) });
            }

            return clients;
        }

        [HttpGet]
        public void AddClient(Client client)
        {
            new DataBaseHelper(dataBaseOptions).Query(string.Format("INSERT INTO [SH_MADERA].[dbo].[TB_INFORMATIONS_CLIENTS]([NOM_CLIENT], [RUE_CLIENT], [CODE_POSTAL_CLIENT], [VILLE_CLIENT], [PAYS_CLIENT], [EMAIL_CLIENT],[TELEPHONE_CLIENT], [MOBILE_CLIENT], [USER_MAJ], [DATE_MAJ]) VALUES ({0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9})", client.Name, client.Street, client.ZipCode, client.City, client.Country, client.Mail, client.Phone, client.Mobile, "thmaudet", DateTime.Now));
        }

        public void UpdateClient(Client client)
        {
            new DataBaseHelper(dataBaseOptions).Query(string.Format("UPDATE [dbo].[TB_INFORMATIONS_CLIENTS] SET [NOM_CLIENT] = {1}, [RUE_CLIENT] = {2}, [CODE_POSTAL_CLIENT] = {3}, [VILLE_CLIENT] = {4}, [PAYS_CLIENT] = {5}, [EMAIL_CLIENT] = {6}, [TELEPHONE_CLIENT] = {7}, [MOBILE_CLIENT] = {8}, [USER_MAJ] = {9}, [DATE_MAJ] = {10} WHERE ID_CLIENT = {0})", client.IdClient, client.Name, client.Street, client.ZipCode, client.City, client.Country, client.Mail, client.Phone, client.Mobile, "thmaudet", DateTime.Now));
        }

        public void DeleteClient(Client client)
        {

        }
    }
}