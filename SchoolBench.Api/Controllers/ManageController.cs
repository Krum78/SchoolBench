using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolBench.Api.Models;
using SchoolBench.Api.Services;

namespace SchoolBench.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ManageController : ControllerBase
    {
        private readonly IDbAccessService _dbAccess;

        public ManageController(IDbAccessService dbAccess)
        {
            _dbAccess = dbAccess;
        }

        [HttpGet]
        public async Task<ActionResult> GetCources()
        {
            return Ok(await _dbAccess.GetCources());
        }

        [HttpPost]
        public async Task<ActionResult> CreateCourse(CourseModel cource)
        {
            return Ok(await _dbAccess.CreateCourse(cource));
        }
    }
}