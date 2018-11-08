using System.ComponentModel.DataAnnotations;
using System.Text;
using Newtonsoft.Json;

namespace SchoolBench.Api.Models
{
    public class CourseModuleModel : ModelBase
    {
        private string _content;

        [Required]
        public long CourseId { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; }

        public string Description { get; set; }

        public string Data { get; set; }

        [MaxLength(500)]
        public string ContentLink { get; set; }

        [Required]
        public bool IsLink { get; set; }
    }
}
