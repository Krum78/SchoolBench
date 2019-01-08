using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SelfStudy.Repository.Entities
{
    [Table("CourseModules")]
    public class CourseModuleEntity : EntityBase
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
