using DomainClasses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

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
        }
    }
}
