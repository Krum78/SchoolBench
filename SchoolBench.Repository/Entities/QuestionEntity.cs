using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SchoolBench.Repository.Entities
{
    [Table("Questions")]
    public class QuestionEntity : EntityBase
    {
        [Required]
        public long TestId { get; set; }

        [Required]
        public int ItemOrder { get; set; }

        [Required]
        public QuestionType Type { get; set; }

        [Required]
        public byte[] Question { get; set; }

        [ForeignKey("QuestionId")]
        public List<AnswerOptionEntity> AnswerOptions { get; set; }
    }
}
