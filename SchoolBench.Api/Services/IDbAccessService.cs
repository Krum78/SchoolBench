using System.Collections.Generic;
using System.Threading.Tasks;
using SchoolBench.Api.Models;

namespace SchoolBench.Api.Services
{
    public interface IDbAccessService
    {
        Task<CourseModel> CreateCourse(CourseModel model);
        Task<IEnumerable<CourseModel>> GetCources();
    }
}