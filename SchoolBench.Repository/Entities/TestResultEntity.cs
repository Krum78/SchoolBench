using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SchoolBench.Repository.Entities
{
    [Table("TestResults")]
    public class TestResultEntity : EntityBase
    {
        [Required]
        public long TestId { get; set; }

        [Required]
        public int Score { get; set; }

        [Required]
        public int MaxScore { get; set; }
    }
}
