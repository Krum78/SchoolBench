using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SchoolBench.Api.Models;
using SchoolBench.Api.Services;
using SchoolBench.Repository;
using SchoolBench.Repository.Entities;

namespace SchoolBench.Api
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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = "https://localhost:44314";
                    options.RequireHttpsMetadata = true;
                    options.EnableCaching = true;
                    options.ApiName = "api2";
                });

            services.AddDbContext<SbDataContext>(o => o.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
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
                builder.AllowCredentials();
                builder.AllowAnyMethod();
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
                cfg.CreateMap<QuestionModel, QuestionEntity>().ReverseMap();
                cfg.CreateMap<AnswerOptionModel, AnswerOptionEntity>().ReverseMap();
            });

            Mapper.Configuration.AssertConfigurationIsValid();
        }
    }
}
