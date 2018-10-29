using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SchoolBench.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpPost]
        public async Task<bool> SpaFallback()
        {
            return await Task.FromResult(true);
        }

        [HttpGet]
        public async Task<int> GetInt()
        {
            var user = Request.HttpContext.User;


            return await Task.FromResult(new Random().Next(int.MaxValue));
        }
    }
}