﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SelfStudy.Repository.Entities
{
    [Table("AnswerOptions")]
    public class AnswerOptionEntity : EntityBase
    {
        [Required]
        public long QuestionId { get; set; }

        [Required]
        public int ItemOrder { get; set; }

        [Required]
        [MaxLength(250)]
        public string Text { get; set; }

        [Required]
        public bool IsCorrect { get; set; }

        [ForeignKey(nameof(QuestionId))]
        public QuestionEntity Question { get; set; }
    }
}
