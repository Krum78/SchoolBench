using System.ComponentModel.DataAnnotations;

namespace SchoolBench.Api.Models
{
    public class TestResultModel : ModelBase
    {
        [Required]
        public long TestId { get; set; }

        [Required]
        public int Score { get; set; }

        [Required]
        public int MaxScore { get; set; }

        public int Percentage { get; set; }
    }
}
