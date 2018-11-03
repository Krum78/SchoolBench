using System.ComponentModel.DataAnnotations;

namespace SchoolBench.Api.Models
{
    public class CourseModel : ModelBase
    {
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
