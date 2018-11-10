﻿using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using SchoolBench.Repository.Entities;

namespace SchoolBench.Repository
{
    public class SbDataContext : DbContext
    {
        public SbDataContext()
        {

        }

        public SbDataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<CourseEntity> Courses { get; set; }

        public DbSet<CourseModuleEntity> CourseModules { get; set; }

        public DbSet<ModuleTestEntity> ModuleTests { get; set; }

        public DbSet<QuestionEntity> Questions { get; set; }

        public DbSet<AnswerOptionEntity> AnswerOptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CourseEntity>();
            modelBuilder.Entity<CourseModuleEntity>();
            modelBuilder.Entity<ModuleTestEntity>();
            modelBuilder.Entity<QuestionEntity>();
            modelBuilder.Entity<AnswerOptionEntity>();
        }
    }
}
