using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolBench.Api.Models
{
    public abstract class ModelBase
    {
        public long Id { get; set; }

        [Required]
        public DateTime? DateCreated { get; set; }

        [Required]
        [MaxLength(50)]
        public string Creator { get; set; }
    }
}
