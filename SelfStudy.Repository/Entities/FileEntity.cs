using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SelfStudy.Repository.Entities
{
    public class FileEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public string FileName { get; set; }

        [Required]
        public byte[] FileContent { get; set; }

        [Required]
        public string ContentType { get; set; }
    }
}
