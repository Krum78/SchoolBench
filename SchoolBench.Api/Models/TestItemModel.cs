using System.ComponentModel.DataAnnotations;
using SchoolBench.Repository.Entities;

namespace SchoolBench.Api.Models
{
    public class TestItemModel : ModelBase
    {
        [Required]
        public long TestId { get; set; }

        [Required]
        public int ItemOrder { get; set; }

        [Required]
        public TestItemType Type { get; set; }

        [Required]
        public byte[] Question { get; set; }
    }
}
