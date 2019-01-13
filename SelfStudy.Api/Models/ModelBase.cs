using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace SelfStudy.Api.Models
{
    public abstract class ModelBase
    {
        public long Id { get; set; }

        public DateTime? DateCreated { get; set; }

        [MaxLength(50)]
        public string Creator { get; set; }

        public void PopulateServiceFields(HttpContext context)
        {
            Creator = context?.User?.Identity?.Name;
            DateCreated = DateTime.Now;
        }
    }
}
