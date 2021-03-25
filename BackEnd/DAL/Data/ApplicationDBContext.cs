using DAL.Configuration;
using DomainClasses;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {}

        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<CourseInstance> CourseInstances { get; set; }


        // Configuration of the domainmodels is done via Fluent API in the Configuration classes
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration<Course>(new CourseConfiguration());
            modelBuilder.ApplyConfiguration<CourseInstance>(new CourseInstanceConfiguration());
        }
    }
}
