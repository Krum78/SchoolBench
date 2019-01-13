using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using SelfStudy.Repository.Entities;

namespace SelfStudy.Api.Models
{
    public class QuestionModel : ModelBase
    {
        [Required]
        public long TestId { get; set; }

        [Required]
        public int ItemOrder { get; set; }

        [Required]
        public QuestionType Type { get; set; }

        public string Question { get; set; }

        public List<AnswerOptionModel> AnswerOptions { get; set; }
    }
}
