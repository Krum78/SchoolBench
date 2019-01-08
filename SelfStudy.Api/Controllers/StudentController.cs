using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SelfStudy.Api.Models;
using SelfStudy.Api.Services;

namespace SelfStudy.Api.Controllers
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
        #endregion

        #region Modules
        [HttpGet]
        [Route("courses/{courseId}/modules")]
        public async Task<ActionResult<IEnumerable<CourseModuleModel>>> GetModules(long courseId)
        {
            return Ok(await _dbAccess.GetCourseModules(courseId));
        }

        [HttpGet]
        [Route("courses/{courseId}/modules/{moduleId}")]
        public async Task<ActionResult<CourseModuleModel>> GetModule(long courseId, long moduleId)
        {
            return Ok(await _dbAccess.GetCourseModule(moduleId));
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
            return Ok(await _dbAccess.GetModuleTestForStudent(testId));
        }

        [HttpPost]
        [Route("test/results")]
        public async Task<ActionResult<TestResultModel>> SubmitTestResults([FromBody] TestResultAnswers resultModel)
        {
            var test = await _dbAccess.GetModuleTest(resultModel.TestId);

            var questionsWithAnswers = test.Questions.Where(q => q.AnswerOptions.Any(a => a.IsCorrect)).ToList();

            var testResult = new TestResultModel
            {
                TestId = test.Id,
                MaxScore = questionsWithAnswers.Count
            };

            testResult.PopulateServiceFields(Request.HttpContext);
            
            foreach (var question in questionsWithAnswers)
            {
                var correctIds = question.AnswerOptions.Where(a => a.IsCorrect).Select(a => a.Id).ToArray();
                var userAnswers = resultModel.QuestionResults.FirstOrDefault(q => q.QuestionId == question.Id)?.SelectedAnswers.ToArray();

                if(userAnswers == null || correctIds.Length != userAnswers.Length)
                    continue;

                var intersect = correctIds.Intersect(userAnswers).ToArray();

                if (intersect.Length == correctIds.Length)
                    testResult.Score++;
            }

            return Ok(await _dbAccess.SubmitTestResult(testResult));
        }
        #endregion

        public void Dispose()
        {
            _dbAccess?.Dispose();
        }
    }
}
