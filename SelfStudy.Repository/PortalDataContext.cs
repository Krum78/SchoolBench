using Microsoft.EntityFrameworkCore;
using SelfStudy.Repository.Entities;

namespace SelfStudy.Repository
{
    public class PortalDataContext : DbContext
    {
        public PortalDataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<CourseEntity> Courses { get; set; }

        public DbSet<CourseModuleEntity> CourseModules { get; set; }

        public DbSet<ModuleTestEntity> ModuleTests { get; set; }

        public DbSet<QuestionEntity> Questions { get; set; }

        public DbSet<AnswerOptionEntity> AnswerOptions { get; set; }

        public DbSet<TestResultEntity> TestResults { get; set; }
        
        public DbSet<FileEntity> Files { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CourseEntity>();
            modelBuilder.Entity<CourseModuleEntity>();
            modelBuilder.Entity<ModuleTestEntity>();
            modelBuilder.Entity<QuestionEntity>();
            modelBuilder.Entity<AnswerOptionEntity>();
            modelBuilder.Entity<TestResultEntity>();
            modelBuilder.Entity<FileEntity>();
        }
    }
}
