using DAL.Data;
using DAL.Interfaces;
using DomainClasses;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class CourseInstanceRepository : ICourseInstanceRepository
    {

        private readonly ApplicationDBContext _context;

        public CourseInstanceRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<CourseInstance>> GetAllCourseInstances()
        {
            // The IQueryable interface is used to order the instances by startdate, showing the oldest results first.
            IQueryable<CourseInstance> instances = from s in _context.CourseInstances select s;

            return await instances.OrderBy(c => c.StartDate).Include(c => c.Course).ToListAsync();
        }


        public async Task<List<CourseInstance>> GetAllCourseInstancesPerGivenWeek(int? weeknr)
        {
            List<CourseInstance> instances = new List<CourseInstance>();

            foreach (var instance in await GetAllCourseInstances())
            {
                var ciWeeknr = ISOWeek.GetWeekOfYear(instance.StartDate);

                if (weeknr == ciWeeknr)
                    instances.Add(instance);
            }
                        
            return instances;
        }



        public async Task<CourseInstance> Create(CourseInstance instance)
        {
            _context.Add(instance);
            await _context.SaveChangesAsync();

            return instance;
        }

        public CourseInstance FindCourseInstanceDuplicate(DateTime startdate, string code)
        {
            return _context.CourseInstances.FirstOrDefault(c => c.StartDate == startdate && c.Course.Code == code);
        }

        public Course FindCourseByCode(string code)
        {
            var instances = _context.CourseInstances.Include(c => c.Course).Where(c => c.Course.Code == code);

            if (instances.Count() == 0)
                return null;
            else
                return instances.First().Course;
        }
    }
}
