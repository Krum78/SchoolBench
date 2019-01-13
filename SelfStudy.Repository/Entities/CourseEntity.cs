using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SelfStudy.Repository.Entities
{
    [Table("Courses")]
    public class CourseEntity : EntityBase
    {
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
