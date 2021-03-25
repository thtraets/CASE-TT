using DAL.Data;
using DAL.Interfaces;
using DomainClasses;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class CourseRepository : ICourseRepository
    {

        private readonly ApplicationDBContext _context;

        public CourseRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Course>> GetAllCourses()
        {
            return await _context.Courses.ToListAsync();
        }

        public async Task<Course> Create(Course course)
        {
            _context.Add(course);

            await _context.SaveChangesAsync();

            return course;
        }

        public async Task<Course> FindCourseByCourseCode(string code)
        {
            return await _context.Courses.FirstOrDefaultAsync(c => c.Code.ToUpper() == code.ToUpper());
        }



    }
}
