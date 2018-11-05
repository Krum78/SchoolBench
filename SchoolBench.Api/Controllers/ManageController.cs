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
    [Authorize(Roles = "ContentCreator, Teacher")]
    public class ManageController : ControllerBase, IDisposable
    {
        private readonly IDbAccessService _dbAccess;

        public ManageController(IDbAccessService dbAccess)
        {
            _dbAccess = dbAccess;
        }

        [HttpGet]
        [Route("courses")]
        public async Task<ActionResult> GetCourses()
        {
            return Ok(await _dbAccess.GetCourses());
        }

        [HttpGet]
        [Route("courses/{courseId}")]
        public async Task<ActionResult> GetCourse(long courseId)
        {
            return Ok(await _dbAccess.GetCourse(courseId));
        }

        [HttpDelete]
        [Route("courses/{courseId}")]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult> DeleteCourse(long courseId)
        {
            return Ok(await _dbAccess.DeleteCourse(courseId));
        }

        [HttpPut]
        [Route("courses")]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult> UpdateCourse(CourseModel course)
        {
            return Ok(await _dbAccess.UpdateCourse(course));
        }

        [HttpPost]
        [Route("courses")]
        [Authorize(Roles = "ContentCreator")]
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