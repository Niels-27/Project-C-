using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend
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
            String text = System.IO.File.ReadAllText("ConnectionStringFile.txt");

            //Add this line to your method
            services.AddDbContext<FashionContext> (
                 opt => opt.UseNpgsql(@text));
            services.AddMvc(options=> {}
            ).AddJsonOptions(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddCors(options => options.AddPolicy("AllowAll", builder =>
            {
            builder.AllowAnyOrigin();
            builder.AllowAnyHeader();
            builder.AllowAnyMethod();
            builder.AllowCredentials();
            })
                        );
            services.AddCors(options => options.AddPolicy("AllowCredentials",
                builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
                        .AllowCredentials();
                    }
                        ));

                    
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(options => options.WithOrigins("http://localhost:3000")
            .WithHeaders("Access-Control-Allow-Origin")
            .WithMethods());

            app.UseMvc();
        }
    }
}
