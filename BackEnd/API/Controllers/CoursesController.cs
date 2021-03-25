using DAL.Interfaces;
using DomainClasses;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {    
        private readonly ICourseRepository _courseContext;

        public CoursesController(ICourseRepository courseContext)
        {
            _courseContext = courseContext;
        }

        //GET: api/Courses/     
        [HttpGet]
        [Route("/api/Courses/")]
        public async Task<List<Course>> GetAllCourses()
        {
            return await _courseContext.GetAllCourses();
        }



    }
}
