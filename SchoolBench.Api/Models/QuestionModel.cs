using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using SchoolBench.Repository.Entities;

namespace SchoolBench.Api.Models
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
