using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolBench.Api.Models
{
    public class QuestionResult
    {
        [Required]
        public long QuestionId { get; set; }
        public List<long> SelectedAnswers { get; set; }
    }
}
