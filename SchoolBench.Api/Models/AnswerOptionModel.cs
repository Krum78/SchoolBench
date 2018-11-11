using System.ComponentModel.DataAnnotations;

namespace SchoolBench.Api.Models
{
    public class AnswerOptionModel : ModelBase
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
    }
}
