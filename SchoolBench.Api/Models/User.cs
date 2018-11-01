using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolBench.Api.Models
{
    public class User
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string[] Roles { get; set; }
    }
}
