using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SchoolBench.Api.Models;
using SchoolBench.Repository;
using SchoolBench.Repository.Entities;

namespace SchoolBench.Api.Services
{
    public class DbAccessService : IDbAccessService
    {
        private readonly SbDataContext _sbContext;

        public DbAccessService(SbDataContext sbContext)
        {
            _sbContext = sbContext;
        }

        public async Task<IEnumerable<CourseModel>> GetCourses()
        {
            var courses = await _sbContext.Courses.ToListAsync();
            return Mapper.Map<IEnumerable<CourseModel>>(courses);
        }

        public async Task<CourseModel> GetCourse(long id)
        {
            var course = await _sbContext.Courses.FindAsync(id);
            return Mapper.Map<CourseModel>(course);
        }

        public async Task<bool> DeleteCourse(long id)
        {
            var course = await _sbContext.Courses.FindAsync(id);
            if (course != null)
            {
                _sbContext.Courses.Remove(course);
                await _sbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<CourseModel> UpdateCourse(CourseModel model)
        {
            var track = _sbContext.Courses.Update(Mapper.Map<CourseEntity>(model));
            
            await _sbContext.SaveChangesAsync();
            return Mapper.Map<CourseModel>(track.Entity);
        }

        public async Task<CourseModel> CreateCourse(CourseModel model)
        {
            var track = await _sbContext.Courses.AddAsync(Mapper.Map<CourseEntity>(model));
            await _sbContext.SaveChangesAsync();
            return Mapper.Map<CourseModel>(track.Entity);
        }

        public void Dispose()
        {
            _sbContext?.Dispose();
        }
    }
}
