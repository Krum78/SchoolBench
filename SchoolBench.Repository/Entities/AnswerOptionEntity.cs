using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolBench.Repository.Entities
{
    [Table("AnswerOptions")]
    public class AnswerOptionEntity : EntityBase
    {
        [Required]
        public long QuestionId { get; set; }

        [Required]
        public short ItemOrder { get; set; }

        [Required]
        [MaxLength(250)]
        public string Text { get; set; }

        [Required]
        public bool IsCorrect { get; set; }
    }
}
