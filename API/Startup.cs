using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;
using MediatR;
using Application.Activities;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            //可以访问如appsetting.json等配置文件。
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });
            ///////////////////////// Add Service ///////////////////////////////////
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    //any request coming from client-app will be allow to use any header and any method(GET, POST etc.)
                 policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddControllers();
        }
        // This method gets called by the runtime.
        //Use this method to configure the HTTP request pipeline.
        // add middleware
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //request come as http request will be rediret to https
            //app.UseHttpsRedirection();
            //api use below to route to approprate controller
            app.UseRouting();
            app.UseAuthorization();
            ///////////////////////// Add MiddleWare ///////////////////////////////////
            app.UseCors("CorsPolicy");
            //map controller endpoints to API
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

