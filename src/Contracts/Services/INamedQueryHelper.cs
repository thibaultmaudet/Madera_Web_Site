using System.Data.SqlClient;

namespace Madera.Contracts.Services
{
    public interface INamedQueryHelper
    {
        SqlDataReader Query();
    }
}
