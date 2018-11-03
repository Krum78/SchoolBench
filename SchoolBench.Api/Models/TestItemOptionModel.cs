using System.ComponentModel.DataAnnotations;

namespace SchoolBench.Api.Models
{
    public class TestItemOptionModel : ModelBase
    {
        [Required]
        public long TestItemId { get; set; }

        [Required]
        public short OptionOrder { get; set; }

        [Required]
        [MaxLength(250)]
        public string Text { get; set; }

        [Required]
        public bool CorrectOption { get; set; }
    }
}
