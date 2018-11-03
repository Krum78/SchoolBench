using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolBench.Api.Models
{
    public class ModuleTestModel : ModelBase
    {
        [Required]
        public long ModuleId { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
