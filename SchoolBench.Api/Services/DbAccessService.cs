using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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

        public async Task<IEnumerable<CourseModel>> GetCources()
        {
            var cources = await _sbContext.Cources.FindAsync();
            return Mapper.Map<IEnumerable<CourseModel>>(cources);
        }

        public async Task<CourseModel> CreateCourse(CourseModel model)
        {
            var track = await _sbContext.Cources.AddAsync(Mapper.Map<CourseEntity>(model));
            await _sbContext.SaveChangesAsync();
            return Mapper.Map<CourseModel>(track.Entity);
        }
    }
}
