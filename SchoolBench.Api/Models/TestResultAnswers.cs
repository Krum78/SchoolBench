using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolBench.Api.Models
{
    public class TestResultAnswers
    {
        [Required]
        public long TestId { get; set; }

        public List<QuestionResult> QuestionResults { get; set; }
    }
}
