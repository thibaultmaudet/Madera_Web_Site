using System.Data.SqlClient;

namespace Madera.Contracts.Services
{
    public interface IDataBaseHelper
    {
        SqlDataReader Query(string request);

        T QueryForObject<T>(string request);
    }
}
