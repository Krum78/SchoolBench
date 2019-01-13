using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SelfStudy.Api.Models
{
    public class TestResultAnswers
    {
        [Required]
        public long TestId { get; set; }

        public List<QuestionResult> QuestionResults { get; set; }
    }
}
