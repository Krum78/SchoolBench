using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SchoolBench.Repository.Entities
{
    [Table("TestItemOptions")]
    public class TestItemOptionEntity : EntityBase
    {
        [Required]
        public long TestItemId { get; set; }

        [Required]
        public short OptionOrder { get; set; }

        [Required]
        [MaxLength(250)]
        public string Text { get; set; }

        [Required]
        public bool CorrectOption { get; set; }
    }
}
