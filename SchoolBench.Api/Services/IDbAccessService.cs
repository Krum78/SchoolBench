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
    }
}