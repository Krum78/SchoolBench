using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolBench.Api.Models
{
    public class FileModel
    {
        public Guid Id { get; set; }

        public string FileName { get; set; }

        public byte[] FileContent { get; set; }

        public string ContentType { get; set; }
    }
}
