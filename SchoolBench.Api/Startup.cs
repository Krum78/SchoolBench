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
using NSwag;
using NSwag.AspNetCore;
using NSwag.SwaggerGeneration.Processors.Security;
using SchoolBench.Api.Extensions;
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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddSwaggerDocument(config =>
            {
                config.Title = "School Bench API";
                config.DocumentProcessors.Add(
                    new SecurityDefinitionAppender("oauth2", new SwaggerSecurityScheme
                    {
                        Type = SwaggerSecuritySchemeType.OAuth2,
                        Description = "School Bench",
                        Flow = SwaggerOAuth2Flow.Implicit,
                        AuthorizationUrl = Configuration.GetAuthorityUrl(),
                        TokenUrl = "https://localhost:44391/core/connect/token",
                        BearerFormat = "",
                        Scopes = new Dictionary<string, string>
                        {
                            { "openid", "" },
                            { "profile", "" },
                            { "api2", "" },
                        }
                    })
                );

                config.OperationProcessors.Add(
                    new OperationSecurityScopeProcessor("oauth2"));
            });

            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = Configuration.GetAuthorityUrl();
                    options.RequireHttpsMetadata = true;
                    options.EnableCaching = true;
                    options.ApiName = "api2";
                });

            services.AddDbContext<SbDataContext>(o => o.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<IDbAccessService, DbAccessService>();

            services.AddHealthChecks();
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
            app.UseSwagger();
            app.UseSwaggerUi3(config =>
            {
                config.OAuth2Client = new OAuth2ClientSettings();

                config.OAuth2Client.ClientId = "4d7c3a0292d24c7abc7f7ee9fdf5b403";
                config.OAuth2Client.Realm = Configuration.GetAuthorityUrl();
                config.OAuth2Client.ScopeSeparator = " ";
            });
            app.UseHealthChecks("/ready");

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
            });

            Mapper.Configuration.AssertConfigurationIsValid();
        }
    }
}
