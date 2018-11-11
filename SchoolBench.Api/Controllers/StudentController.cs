using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolBench.Api.Models;
using SchoolBench.Api.Services;

namespace SchoolBench.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StudentController : ControllerBase, IDisposable
    {
        private readonly IDbAccessService _dbAccess;

        public StudentController(IDbAccessService dbAccess)
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
        #endregion

        #region Module Tests
        [HttpGet]
        [Route("modules/{moduleId}/tests")]
        public async Task<ActionResult> GetTests(long moduleId)
        {
            return Ok(await _dbAccess.GetModuleTests(moduleId));
        }

        [HttpGet]
        [Route("modules/{moduleId}/tests/{testId}")]
        public async Task<ActionResult> GetTest(long testId)
        {
            return Ok(await _dbAccess.GetModuleTestForStudent(testId));
        }
        #endregion

        public void Dispose()
        {
            _dbAccess?.Dispose();
        }
    }
}
