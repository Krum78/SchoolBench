using Microsoft.Extensions.Configuration;

namespace SelfStudy.Api.Extensions
{
    public static class ConfigurationExtensions
    {
        public static string GetAuthorityUrl(this IConfiguration configuration)
        {
            return configuration.GetSection("Authentication")?["Authority"] ?? "https://localhost:44314";
        }
    }
}
