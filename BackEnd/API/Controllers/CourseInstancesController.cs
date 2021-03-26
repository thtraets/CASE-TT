using DAL.Interfaces;
using API.Utils;
using DomainClasses;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseInstancesController : ControllerBase
    {
        private readonly ICourseInstanceRepository _courseInstanceContext;

        public CourseInstancesController(ICourseInstanceRepository courseInstanceContext)
        {
            _courseInstanceContext = courseInstanceContext;
        }

        //GET: api/CourseInstances/     
        [HttpGet]
        [Route("/api/CourseInstances/")]
        public async Task<List<CourseInstance>> GetAllCourseInstances()
        {
            return await _courseInstanceContext.GetAllCourseInstances();
        }

        //GET: api/CourseInstances/     
        [HttpGet]
        [Route("/api/CourseInstances/week/{weeknr?}/{year?}")]
        public async Task<List<CourseInstance>> GetAllCourseInstancesPerGivenWeek(int? weeknr, int? year)
        {
            // If no value is given for the week number and year, the current week and year are used
            if (weeknr == null)
                weeknr = ISOWeek.GetWeekOfYear(DateTime.Now);
            if (year == null)
                year = ISOWeek.GetYear(DateTime.Now);

            return await _courseInstanceContext.GetAllCourseInstancesPerGivenWeek(weeknr, year);
        }

        //POST: api/CourseInstances/     
        [HttpPost]
        [Route("/api/CourseInstances/")]
        public async Task<IActionResult> PostCourseInstances(CourseInstance[] instances)
        {
            if (ModelState.IsValid)
            {
                int instancesAdded = 0;
                int coursesAdded = 0;
                int duplicateInstances = 0;
                int duplicateCourses = 0;

                foreach (var instance in instances)
                {
                    // If a course code does not yet exist, add the course and instance
                    if (_courseInstanceContext.FindCourseByCode(instance.Course.Code) == null)
                    {
                        await _courseInstanceContext.Create(instance);
                        instancesAdded++;
                        coursesAdded++;
                        continue;
                    }
                    duplicateCourses++;

                    // If a course code does exist, check if there already exists an instance with this code on the same startdate
                    if (_courseInstanceContext.FindCourseInstanceDuplicate(instance.StartDate, instance.Course.Code) == null)
                    {
                        instance.Course = _courseInstanceContext.FindCourseByCode(instance.Course.Code);
                        await _courseInstanceContext.Create(instance);
                        instancesAdded++;
                        continue;
                    }
                    duplicateInstances++;
                }

                // An UploadResponse json object is returned with information about the added/dupilcate courses and instances
                return Ok(new UploadResponse()
                {
                    InstancesAdded = instancesAdded,
                    CoursesAdded = coursesAdded,
                    DuplicateInstances = duplicateInstances,
                    DuplicateCourses = duplicateCourses
                });
            }

            return BadRequest();
        }
    }  
}
