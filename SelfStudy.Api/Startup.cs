using System.Text;
using AutoMapper;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SelfStudy.Api.Extensions;
using SelfStudy.Api.Models;
using SelfStudy.Api.Services;
using SelfStudy.Repository;
using SelfStudy.Repository.Entities;

namespace SelfStudy.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = Configuration.GetAuthorityUrl();
                    options.RequireHttpsMetadata = true;
                    options.EnableCaching = true;
                    options.ApiName = "api2";
                    options.SaveToken = true;
                });
            
            services.AddDbContext<PortalDataContext>(o => o.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<IDbAccessService, DbAccessService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseCors(builder =>
            {
                builder.AllowAnyOrigin();
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
                builder.AllowCredentials();
                builder.Build();
            });

            app.UseAuthentication();
            app.UseMvc();

            InitializeMapper();
        }

        private void InitializeMapper()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<string, byte[]>().ConvertUsing(s => Encoding.Unicode.GetBytes(s ?? string.Empty));
                cfg.CreateMap<byte[], string>().ConvertUsing(bytes => Encoding.Unicode.GetString(bytes));

                cfg.CreateMap<CourseModel, CourseEntity>().ReverseMap();
                cfg.CreateMap<CourseModuleModel, CourseModuleEntity>();
                cfg.CreateMap<ModuleTestModel, ModuleTestEntity>().ReverseMap();
                cfg.CreateMap<QuestionModel, QuestionEntity>().ForMember(q => q.ModuleTest, c => c.Ignore()).ReverseMap();
                cfg.CreateMap<AnswerOptionModel, AnswerOptionEntity>().ForMember(a => a.Question, c => c.Ignore()).ReverseMap();

                cfg.CreateMap<TestResultModel, TestResultEntity>().ReverseMap().ForMember(p => p.Percentage, c => c.MapFrom((src, t) => (int)(src.Score / (double)src.MaxScore * 100)));

                cfg.CreateMap<FileModel, FileEntity>().ReverseMap();
            });

            Mapper.Configuration.AssertConfigurationIsValid();
        }
    }
}
