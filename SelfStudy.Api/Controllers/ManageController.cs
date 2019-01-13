using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SelfStudy.Api.Models;
using SelfStudy.Api.Services;

namespace SelfStudy.Api.Controllers
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
        public async Task<ActionResult<IEnumerable<CourseModel>>> GetCourses()
        {
            return Ok(await _dbAccess.GetCourses());
        }

        [HttpGet]
        [Route("courses/{courseId}")]
        public async Task<ActionResult<CourseModel>> GetCourse(long courseId)
        {
            return Ok(await _dbAccess.GetCourse(courseId));
        }

        [HttpDelete]
        [Route("courses/{courseId}")]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult<bool>> DeleteCourse(long courseId)
        {
            return Ok(await _dbAccess.DeleteCourse(courseId));
        }

        [HttpPut]
        [Route("courses")]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult<CourseModel>> UpdateCourse([FromBody] CourseModel course)
        {
            return Ok(await _dbAccess.UpdateCourse(course));
        }

        [HttpPost]
        [Route("courses")]
        [Authorize(Roles = "ContentCreator")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CourseModel>> CreateCourse([FromBody] CourseModel course)
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
        public async Task<ActionResult<IEnumerable<ModuleTestModel>>> GetTests(long moduleId)
        {
            return Ok(await _dbAccess.GetModuleTests(moduleId));
        }

        [HttpGet]
        [Route("modules/{moduleId}/tests/{testId}")]
        public async Task<ActionResult<ModuleTestModel>> GetTest(long testId)
        {
            return Ok(await _dbAccess.GetModuleTest(testId));
        }

        [HttpDelete]
        [Route("modules/{moduleId}/tests/{testId}")]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult<bool>> DeleteTest(long testId)
        {
            return Ok(await _dbAccess.DeleteModuleTest(testId));
        }

        [HttpPut]
        [Route("modules/{moduleId}/tests")]
        [Authorize(Roles = "ContentCreator")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ModuleTestModel>> UpdateTest([FromBody] ModuleTestModel test, long moduleId)
        {
            if (test.ModuleId != moduleId)
                return BadRequest();
            
            test.Questions?.ForEach(q =>
            {
                if (q.Id == 0)
                    q.PopulateServiceFields(Request.HttpContext);

                q.AnswerOptions?.ForEach(a =>
                {
                    if (a.Id == 0)
                        a.PopulateServiceFields(Request.HttpContext);
                });
            });

            return Ok(await _dbAccess.UpdateModuleTest(test));
        }

        [HttpPost]
        [Route("modules/{moduleId}/tests")]
        [Authorize(Roles = "ContentCreator")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ModuleTestModel>> CreateTest([FromBody] ModuleTestModel test, long moduleId)
        {
            if (test == null || test.ModuleId != moduleId)
                return BadRequest();

            test.PopulateServiceFields(Request.HttpContext);

            return Ok(await _dbAccess.CreateModuleTest(test));
        }
        #endregion

        #region Questions
        [HttpGet]
        [Route("tests/{testId}/questions")]
        public async Task<ActionResult<IEnumerable<QuestionModel>>> GetQuestions(long testId)
        {
            return Ok(await _dbAccess.GetQuestions(testId));
        }

        [HttpGet]
        [Route("tests/{testId}/questions/{questionId}")]
        public async Task<ActionResult<QuestionModel>> GetQuestion(long questionId)
        {
            return Ok(await _dbAccess.GetQuestion(questionId));
        }

        [HttpDelete]
        [Route("tests/{testId}/questions/{questionId}")]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult<bool>> DeleteQuestion(long questionId)
        {
            return Ok(await _dbAccess.DeleteQuestion(questionId));
        }

        [HttpPut]
        [Route("tests/{testId}/questions")]
        [Authorize(Roles = "ContentCreator")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<QuestionModel>> UpdateQuestion([FromBody] QuestionModel question, long testId)
        {
            if (question.TestId != testId)
                return BadRequest();

            return Ok(await _dbAccess.UpdateQuestion(question));
        }

        [HttpPost]
        [Route("tests/{testId}/questions")]
        [Authorize(Roles = "ContentCreator")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<QuestionModel>> CreateQuestion([FromBody] QuestionModel question, long testId)
        {
            if (question == null || question.TestId != testId)
                return BadRequest();

            question.PopulateServiceFields(Request.HttpContext);

            return Ok(await _dbAccess.CreateQuestion(question));
        }
        #endregion

        [HttpGet]
        [Route("tests/{testId}/results")]
        [Authorize(Roles = "Teacher")]
        public async Task<ActionResult<List<TestResultModel>>> GetTestResults(long testId)
        {
            return Ok(await _dbAccess.GetTestResults(testId));
        }

        public void Dispose()
        {
            _dbAccess?.Dispose();
        }
    }
}