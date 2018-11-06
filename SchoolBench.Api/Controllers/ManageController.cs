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

        #region Courses
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
        public async Task<ActionResult> UpdateCourse([FromBody] CourseModel course)
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
        #endregion

        #region Modules
        [HttpGet]
        [Route("courses/{courseId}/modules")]
        public async Task<ActionResult> GetModules(long courseId)
        {
            return Ok(await _dbAccess.GetCourseModules(courseId));
        }

        [HttpGet]
        [Route("courses/{courseId}/modules/{moduleId}")]
        public async Task<ActionResult> GetModule(long courseId, long moduleId)
        {
            return Ok(await _dbAccess.GetCourseModule(moduleId));
        }

        [HttpDelete]
        [Route("courses/{courseId}/modules/{moduleId}")]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult> DeleteModule(long courseId, long moduleId)
        {
            return Ok(await _dbAccess.DeleteCourseModule(moduleId));
        }

        [HttpPut]
        [Route("courses/{courseId}/modules")]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult> UpdateModule([FromBody]CourseModuleModel module, long courseId)
        {
            if (module.CourseId != courseId)
                return BadRequest();

            return Ok(await _dbAccess.UpdateCourseModule(module));
        }

        [HttpPost]
        [Route("courses/{courseId}/modules")]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult> CreateModule([FromBody] CourseModuleModel module, long courseId)
        {
            if (module == null || module.CourseId != courseId)
                return BadRequest();

            module.PopulateServiceFields(Request.HttpContext);

            return Ok(await _dbAccess.CreateCourseModule(module));
        }
        #endregion

        public void Dispose()
        {
            _dbAccess?.Dispose();
        }
    }
}