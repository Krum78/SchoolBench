using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace SchoolBench.Api.Extensions
{
    public static class ConfigurationExtensions
    {
        public static string GetAuthorityUrl(this IConfiguration configuration)
        {
            return configuration.GetSection("Authentication")?["Authority"] ?? "https://localhost:44314";
        }
    }
}
