using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SelfStudy.Api.Models;
using SelfStudy.Repository;
using SelfStudy.Repository.Entities;

namespace SelfStudy.Api.Services
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
            var test = await _sbContext.ModuleTests.Include(t => t.Questions).ThenInclude(q => q.AnswerOptions).FirstOrDefaultAsync(t => t.Id == id);

            test.Questions = test.Questions.OrderBy(q => q.ItemOrder).ToList();
            test.Questions.ForEach(q => q.AnswerOptions = q.AnswerOptions.OrderBy(a => a.ItemOrder).ToList());

            return Mapper.Map<ModuleTestModel>(test);
        }

        public async Task<ModuleTestModel> GetModuleTestForStudent(long id)
        {
            var test = await _sbContext.ModuleTests.Include(t => t.Questions).ThenInclude(q => q.AnswerOptions).FirstOrDefaultAsync(t => t.Id == id);

            test.Questions = test.Questions.OrderBy(q => q.ItemOrder).ToList();
            test.Questions.ForEach(q =>
            {
                q.AnswerOptions = q.AnswerOptions.OrderBy(a => a.ItemOrder).ToList();
                q.AnswerOptions.ForEach(a => a.IsCorrect = false);
            });

            return Mapper.Map<ModuleTestModel>(test);
        }

        public async Task<TestResultModel> SubmitTestResult(TestResultModel result)
        {
            var track = await _sbContext.TestResults.AddAsync(Mapper.Map<TestResultEntity>(result));
            await _sbContext.SaveChangesAsync();
            return Mapper.Map<TestResultModel>(track.Entity);
        }

        public async Task<List<TestResultModel>> GetTestResults(long testId)
        {
            return Mapper.Map<List<TestResultModel>>(await _sbContext.TestResults.Where(r => r.TestId == testId)
                .OrderBy(r => r.Creator).ThenByDescending(r => r.DateCreated)
                .ToListAsync());
        }

        private async Task<ModuleTestEntity> GetModuleTestNoTrack(long id)
        {
            return await _sbContext.ModuleTests.Include(t => t.Questions).ThenInclude(q => q.AnswerOptions).AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
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
            using (TransactionScope ts = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var original = await GetModuleTestNoTrack(model.Id);

                var current = Mapper.Map<ModuleTestEntity>(model);

                var testTrack = _sbContext.ModuleTests.Attach(current);
                testTrack.State = EntityState.Modified;

                if (current.Questions != null)
                {
                    var questionsToInsert = current.Questions.Where(q => q.Id == 0).ToList();
                    questionsToInsert.ForEach(q =>
                    {
                        q.ModuleTest = testTrack.Entity;
                    });

                    if (original.Questions != null)
                    {
                        var origIds = original.Questions.Select(q => q.Id).ToList();
                        var entIds = current.Questions.Select(q => q.Id).ToList();

                        var toDelete = origIds.Except(entIds);
                        var toUpdate = origIds.Intersect(entIds);

                        foreach (var id in toDelete)
                        {
                            var t = _sbContext.Questions.Attach(original.Questions.First(q => q.Id == id));
                            t.State = EntityState.Deleted;
                        }
                        
                        await UpsertQuestions(current.Questions.Where(q => toUpdate.Contains(q.Id)).ToList(), original.Questions);
                    }

                    await UpsertQuestions(questionsToInsert, null);
                }
            
                await _sbContext.SaveChangesAsync();
                ts.Complete();
            }

            return Mapper.Map<ModuleTestModel>(await GetModuleTest(model.Id));
        }

        public async Task<ModuleTestModel> CreateModuleTest(ModuleTestModel model)
        {
            var track = await _sbContext.ModuleTests.AddAsync(Mapper.Map<ModuleTestEntity>(model));
            await _sbContext.SaveChangesAsync();
            return Mapper.Map<ModuleTestModel>(track.Entity);
        }
        #endregion

        #region Questions
        public async Task<IEnumerable<QuestionModel>> GetQuestions(long testId)
        {
            var tests = await _sbContext.Questions.Where(m => m.TestId == testId).Include(q => q.AnswerOptions).ToListAsync();
            return Mapper.Map<IEnumerable<QuestionModel>>(tests);
        }

        public async Task<QuestionModel> GetQuestion(long id)
        {
            var test = await _sbContext.Questions.Include(q => q.AnswerOptions).FirstOrDefaultAsync(q => q.Id == id);
            return Mapper.Map<QuestionModel>(test);
        }

        public async Task<bool> DeleteQuestion(long id)
        {
            var test = await _sbContext.Questions.FindAsync(id);
            if (test != null)
            {
                _sbContext.Questions.Remove(test);
                await _sbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<QuestionModel> UpdateQuestion(QuestionModel model)
        {
            var track = _sbContext.Questions.Update(Mapper.Map<QuestionEntity>(model));

            await _sbContext.SaveChangesAsync();
            return Mapper.Map<QuestionModel>(track.Entity);
        }

        private async Task<bool> UpsertQuestions(List<QuestionEntity> questions, List<QuestionEntity> originalQuestions)
        {
            foreach (var questionEntity in questions)
            {
                if (questionEntity.Id < 0)
                {
                    var qTrack = await _sbContext.Questions.AddAsync(questionEntity);

                    if(questionEntity.AnswerOptions == null)
                        continue;

                    foreach (var answerOption in questionEntity.AnswerOptions)
                    {
                        var answEntity = Mapper.Map<AnswerOptionEntity>(answerOption);
                        answEntity.Question = qTrack.Entity;
                        await _sbContext.AnswerOptions.AddAsync(answEntity);
                    }
                }
                else
                {
                    if (questionEntity.AnswerOptions != null)
                    {
                        var original = originalQuestions.First(q => q.Id == questionEntity.Id);

                        var origIds = original.AnswerOptions.Select(q => q.Id).ToList();
                        var entIds = questionEntity.AnswerOptions?.Select(q => q.Id).ToList();

                        var toDelete = origIds.Except(entIds);
                        var toUpdate = origIds.Intersect(entIds);

                        var deletedAnsw = original.AnswerOptions.Where(a => toDelete.Contains(a.Id)).ToList();
                        deletedAnsw.ForEach(a =>
                        {
                            _sbContext.AnswerOptions.Attach(a).State = EntityState.Deleted;
                        });

                        var updatedAnsw = questionEntity.AnswerOptions.Where(a => toUpdate.Contains(a.Id)).ToList();
                        updatedAnsw.ForEach(a =>
                        {
                            _sbContext.AnswerOptions.Attach(a).State = EntityState.Modified;
                        });
                    }
                    var qTrack = _sbContext.Questions.Attach(questionEntity);
                    qTrack.State = EntityState.Modified;

                    var toInsert = questionEntity.AnswerOptions?.Where(a => a.Id < 0).ToList();

                    if(toInsert == null)
                        continue;

                    toInsert.ForEach(a => a.Question = qTrack.Entity);
                    await _sbContext.AnswerOptions.AddRangeAsync(toInsert);
                }
            }

            return true;
        }

        public async Task<QuestionModel> CreateQuestion(QuestionModel model)
        {
            var track = await _sbContext.Questions.AddAsync(Mapper.Map<QuestionEntity>(model));
            await _sbContext.SaveChangesAsync();
            return Mapper.Map<QuestionModel>(track.Entity);
        }
        #endregion

        #region Files
        public async Task<FileModel> UploadFile(FileModel model)
        {
            var track = await _sbContext.Files.AddAsync(Mapper.Map<FileEntity>(model));
            await _sbContext.SaveChangesAsync();
            return Mapper.Map<FileModel>(track.Entity);
        }

        public async Task<FileModel> GetFile(Guid id)
        {
            return Mapper.Map<FileModel>(await _sbContext.Files.FindAsync(id));
            
        }
        #endregion

        public void Dispose()
        {
            _sbContext?.Dispose();
        }
    }
}
