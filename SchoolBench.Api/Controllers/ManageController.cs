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
    public class ManageController : ControllerBase, IDisposable
    {
        private readonly IDbAccessService _dbAccess;

        public ManageController(IDbAccessService dbAccess)
        {
            _dbAccess = dbAccess;
        }

        [HttpGet]
        [Route("cources")]
        public async Task<ActionResult> GetCources()
        {
            return Ok(await _dbAccess.GetCources());
        }

        [HttpGet]
        [Route("cources/{courseId}")]
        public async Task<ActionResult> GetCourse(long courseId)
        {
            return Ok(await _dbAccess.GetCourse(courseId));
        }

        [HttpDelete]
        [Route("cources/{courseId}")]
        public async Task<ActionResult> DeleteCourse(long courseId)
        {
            return Ok(await _dbAccess.DeleteCourse(courseId));
        }

        [HttpPut]
        [Route("cources")]
        public async Task<ActionResult> UpdateCourse(CourseModel course)
        {
            return Ok(await _dbAccess.UpdateCourse(course));
        }

        [HttpPost]
        [Route("cources")]
        public async Task<ActionResult> CreateCourse([FromBody] CourseModel course)
        {
            if (course == null)
                return BadRequest();

            course.PopulateServiceFields(Request.HttpContext);
            
            return Ok(await _dbAccess.CreateCourse(course));
        }


        public void Dispose()
        {
            _dbAccess?.Dispose();
        }
    }
}