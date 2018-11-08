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
        #region Courses
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
        #endregion

        #region CourseModules
        public async Task<IEnumerable<CourseModuleModel>> GetCourseModules(long courseId)
        {
            var modules = await _sbContext.CourseModules.Where(m => m.CourseId == courseId).ToListAsync();
            return Mapper.Map<IEnumerable<CourseModuleModel>>(modules);
        }

        public async Task<CourseModuleModel> GetCourseModule(long id)
        {
            var module = await _sbContext.CourseModules.FindAsync(id);
            return Mapper.Map<CourseModuleModel>(module);
        }

        public async Task<bool> DeleteCourseModule(long id)
        {
            var module = await _sbContext.CourseModules.FindAsync(id);
            if (module != null)
            {
                _sbContext.CourseModules.Remove(module);
                await _sbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<CourseModuleModel> UpdateCourseModule(CourseModuleModel model)
        {
            var track = _sbContext.CourseModules.Update(Mapper.Map<CourseModuleEntity>(model));

            await _sbContext.SaveChangesAsync();
            return Mapper.Map<CourseModuleModel>(track.Entity);
        }

        public async Task<CourseModuleModel> CreateCourseModule(CourseModuleModel model)
        {
            var track = await _sbContext.CourseModules.AddAsync(Mapper.Map<CourseModuleEntity>(model));
            await _sbContext.SaveChangesAsync();
            return Mapper.Map<CourseModuleModel>(track.Entity);
        }
        #endregion

        #region Module Tests
        public async Task<IEnumerable<ModuleTestModel>> GetModuleTests(long moduleId)
        {
            var tests = await _sbContext.ModuleTests.Where(m => m.ModuleId == moduleId).ToListAsync();
            return Mapper.Map<IEnumerable<ModuleTestModel>>(tests);
        }

        public async Task<ModuleTestModel> GetModuleTest(long id)
        {
            var test = await _sbContext.ModuleTests.FindAsync(id);
            return Mapper.Map<ModuleTestModel>(test);
        }

        public async Task<bool> DeleteModuleTest(long id)
        {
            var test = await _sbContext.ModuleTests.FindAsync(id);
            if (test != null)
            {
                _sbContext.ModuleTests.Remove(test);
                await _sbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<ModuleTestModel> UpdateModuleTest(ModuleTestModel model)
        {
            var track = _sbContext.ModuleTests.Update(Mapper.Map<ModuleTestEntity>(model));

            await _sbContext.SaveChangesAsync();
            return Mapper.Map<ModuleTestModel>(track.Entity);
        }

        public async Task<ModuleTestModel> CreateModuleTest(ModuleTestModel model)
        {
            var track = await _sbContext.ModuleTests.AddAsync(Mapper.Map<ModuleTestEntity>(model));
            await _sbContext.SaveChangesAsync();
            return Mapper.Map<ModuleTestModel>(track.Entity);
        }
        #endregion

        #region Test Items
        public async Task<IEnumerable<TestItemModel>> GetTestItems(long testId)
        {
            var tests = await _sbContext.TestItems.Where(m => m.TestId == testId).ToListAsync();
            return Mapper.Map<IEnumerable<TestItemModel>>(tests);
        }

        public async Task<TestItemModel> GetTestItem(long id)
        {
            var test = await _sbContext.TestItems.FindAsync(id);
            return Mapper.Map<TestItemModel>(test);
        }

        public async Task<bool> DeleteTestItem(long id)
        {
            var test = await _sbContext.TestItems.FindAsync(id);
            if (test != null)
            {
                _sbContext.TestItems.Remove(test);
                await _sbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<TestItemModel> UpdateTestItem(TestItemModel model)
        {
            var track = _sbContext.TestItems.Update(Mapper.Map<TestItemEntity>(model));

            await _sbContext.SaveChangesAsync();
            return Mapper.Map<TestItemModel>(track.Entity);
        }

        public async Task<TestItemModel> CreateTestItem(TestItemModel model)
        {
            var track = await _sbContext.TestItems.AddAsync(Mapper.Map<TestItemEntity>(model));
            await _sbContext.SaveChangesAsync();
            return Mapper.Map<TestItemModel>(track.Entity);
        }
        #endregion

        public void Dispose()
        {
            _sbContext?.Dispose();
        }
    }
}
