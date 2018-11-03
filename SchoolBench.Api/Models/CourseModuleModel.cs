using System.ComponentModel.DataAnnotations;

namespace SchoolBench.Api.Models
{
    public class CourseModuleModel : ModelBase
    {
        [Required]
        public long CourseId { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; }

        public string Description { get; set; }

        public byte[] Data { get; set; }

        [MaxLength(500)]
        public string ContentLink { get; set; }

        [Required]
        public bool IsLink { get; set; }
    }
}
