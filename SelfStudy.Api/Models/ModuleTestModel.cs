using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SelfStudy.Api.Models
{
    public class ModuleTestModel : ModelBase
    {
        [Required]
        public long ModuleId { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; }

        public string Description { get; set; }

        public List<QuestionModel> Questions { get; set; }
    }
}
