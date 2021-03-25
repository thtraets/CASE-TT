using DomainClasses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface ICourseRepository
    {
        Task<List<Course>> GetAllCourses();
        Task<Course> Create(Course course);
        Task<Course> FindCourseByCourseCode(string code);
        
    }
}
