using DomainClasses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Configuration
{
    public class CourseInstanceConfiguration : IEntityTypeConfiguration<CourseInstance>
    {
        public void Configure(EntityTypeBuilder<CourseInstance> builder)
        {
            builder.HasKey(ci => ci.Id);
            builder.Property(ci => ci.Id)
                .ValueGeneratedOnAdd();
            builder.Property(ci => ci.StartDate)
                .IsRequired();
            builder.Property(ci => ci.Course)
                .IsRequired();
            builder.HasOne(c => c.Course);
        }
    }
}
