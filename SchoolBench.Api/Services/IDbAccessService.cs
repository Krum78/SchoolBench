using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SchoolBench.Api.Models;

namespace SchoolBench.Api.Services
{
    public interface IDbAccessService : IDisposable
    {
        Task<CourseModel> CreateCourse(CourseModel model);
        Task<IEnumerable<CourseModel>> GetCourses();
        Task<CourseModel> GetCourse(long id);
        Task<bool> DeleteCourse(long id);
        Task<CourseModel> UpdateCourse(CourseModel model);
        Task<IEnumerable<CourseModuleModel>> GetCourseModules(long courseId);
        Task<CourseModuleModel> GetCourseModule(long id);
        Task<bool> DeleteCourseModule(long id);
        Task<CourseModuleModel> UpdateCourseModule(CourseModuleModel model);
        Task<CourseModuleModel> CreateCourseModule(CourseModuleModel model);
        Task<IEnumerable<ModuleTestModel>> GetModuleTests(long moduleId);
        Task<ModuleTestModel> GetModuleTest(long id);
        Task<bool> DeleteModuleTest(long id);
        Task<ModuleTestModel> UpdateModuleTest(ModuleTestModel model);
        Task<ModuleTestModel> CreateModuleTest(ModuleTestModel model);
        Task<IEnumerable<TestItemModel>> GetTestItems(long testId);
        Task<TestItemModel> GetTestItem(long id);
        Task<bool> DeleteTestItem(long id);
        Task<TestItemModel> UpdateTestItem(TestItemModel model);
        Task<TestItemModel> CreateTestItem(TestItemModel model);
    }
}