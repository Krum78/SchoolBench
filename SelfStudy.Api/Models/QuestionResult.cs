using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SelfStudy.Api.Models
{
    public class QuestionResult
    {
        [Required]
        public long QuestionId { get; set; }
        public List<long> SelectedAnswers { get; set; }
    }
}
