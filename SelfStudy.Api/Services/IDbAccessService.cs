﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SelfStudy.Api.Models;

namespace SelfStudy.Api.Services
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
        Task<IEnumerable<QuestionModel>> GetQuestions(long testId);
        Task<QuestionModel> GetQuestion(long id);
        Task<bool> DeleteQuestion(long id);
        Task<QuestionModel> UpdateQuestion(QuestionModel model);
        Task<QuestionModel> CreateQuestion(QuestionModel model);
        Task<ModuleTestModel> GetModuleTestForStudent(long id);
        Task<TestResultModel> SubmitTestResult(TestResultModel result);
        Task<List<TestResultModel>> GetTestResults(long testId);
        Task<FileModel> UploadFile(FileModel model);
        Task<FileModel> GetFile(Guid id);
    }
}