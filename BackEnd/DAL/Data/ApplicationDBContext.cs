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




    }
}
