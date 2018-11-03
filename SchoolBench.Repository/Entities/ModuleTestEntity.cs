using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SchoolBench.Repository.Entities
{
    [Table("ModuleTests")]
    public class ModuleTestEntity : EntityBase
    {
        [Required]
        public long ModuleId { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
