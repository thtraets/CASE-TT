using System;
using System.Collections.Generic;
using System.Text;

namespace DomainClasses
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }
        public int Duration { get; set; }


        // One course can have multiple courseinstances
        //public ICollection<CourseInstance> CourseInstances { get; set; } 
    }
}
