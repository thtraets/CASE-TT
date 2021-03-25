using DomainClasses;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface ICourseInstanceRepository
    {
        Task<List<CourseInstance>> GetAllCourseInstancesPerGivenWeek(int? weeknr);
        Task<List<CourseInstance>> GetAllCourseInstances();
        Task<CourseInstance> Create(CourseInstance instance);
        CourseInstance FindCourseInstanceDuplicate(DateTime startdate, string code);
        Course FindCourseByCode(string code);
    }
}
