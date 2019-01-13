using System;

namespace SelfStudy.Api.Models
{
    public class FileModel
    {
        public Guid Id { get; set; }

        public string FileName { get; set; }

        public byte[] FileContent { get; set; }

        public string ContentType { get; set; }
    }
}
