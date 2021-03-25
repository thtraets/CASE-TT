using System;
using System.Collections.Generic;
using System.Text;

namespace DomainClasses
{
    public class CourseInstance
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }


        // A couresinstance has one course
        public Course Course { get; set; }
    }
}
