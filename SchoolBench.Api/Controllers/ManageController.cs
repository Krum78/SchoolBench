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
        public async Task<ActionResult> UpdateModule([FromBody] CourseModuleModel module, long courseId)
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
            return Ok(await _dbAccess.GetModuleTest(testId));
        }

        [HttpDelete]
        [Route("modules/{moduleId}/tests/{testId}")]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult> DeleteTest(long testId)
        {
            return Ok(await _dbAccess.DeleteModuleTest(testId));
        }

        [HttpPut]
        [Route("modules/{moduleId}/tests")]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult> UpdateTest([FromBody] ModuleTestModel test, long moduleId)
        {
            if (test.ModuleId != moduleId)
                return BadRequest();

            return Ok(await _dbAccess.UpdateModuleTest(test));
        }

        [HttpPost]
        [Route("modules/{moduleId}/tests")]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult> CreateTest([FromBody] ModuleTestModel test, long moduleId)
        {
            if (test == null || test.ModuleId != moduleId)
                return BadRequest();

            test.PopulateServiceFields(Request.HttpContext);

            return Ok(await _dbAccess.CreateModuleTest(test));
        }
        #endregion

        #region Test Items
        [HttpGet]
        [Route("tests/{testId}/items")]
        public async Task<ActionResult> GetTestItems(long testId)
        {
            return Ok(await _dbAccess.GetTestItems(testId));
        }

        [HttpGet]
        [Route("tests/{testId}/items/{itemId}")]
        public async Task<ActionResult> GetTestItem(long itemId)
        {
            return Ok(await _dbAccess.GetTestItem(itemId));
        }

        [HttpDelete]
        [Route("tests/{testId}/items/{itemId}")]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult> DeleteTestItem(long itemId)
        {
            return Ok(await _dbAccess.DeleteTestItem(itemId));
        }

        [HttpPut]
        [Route("tests/{testId}/items")]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult> UpdateTestItem([FromBody] TestItemModel item, long testId)
        {
            if (item.TestId != testId)
                return BadRequest();

            return Ok(await _dbAccess.UpdateTestItem(item));
        }

        [HttpPost]
        [Route("tests/{testId}/items")]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult> CreateTest([FromBody] TestItemModel item, long testId)
        {
            if (item == null || item.TestId != testId)
                return BadRequest();

            item.PopulateServiceFields(Request.HttpContext);

            return Ok(await _dbAccess.CreateTestItem(item));
        }
        #endregion

        public void Dispose()
        {
            _dbAccess?.Dispose();
        }
    }
}