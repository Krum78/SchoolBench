using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace SchoolBench.Api.Models
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
