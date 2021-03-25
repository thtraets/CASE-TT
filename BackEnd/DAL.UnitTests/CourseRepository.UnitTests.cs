using DAL.Data;
using DAL.Repositories;
using DomainClasses;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.UnitTests
{
    [TestClass]
    public class CourseRepositoryTests
    {
        private ApplicationDBContext _context;
        private DbContextOptions<ApplicationDBContext> _options;
        private CourseRepository _repository;

        [TestInitialize]
        public void Initialize()
        {
            string dataBaseName = Guid.NewGuid().ToString();
            _options = new DbContextOptionsBuilder<ApplicationDBContext>()
                .UseInMemoryDatabase(databaseName: dataBaseName)
                .Options;
            _context = new ApplicationDBContext(_options);
            _context.Database.EnsureDeleted();


            List<Course> courses = new List<Course>()
            {
                new Course() { Id = 1, Title = "First title",  Code = "First Code", Duration = 5},
                new Course() { Id = 2, Title = "Second title", Code = "Second Code", Duration = 2 },
                new Course() { Id = 3, Title = "Third title", Code = "Third Code", Duration = 5 },
                new Course() { Id = 4, Title = "Fourth title", Code = "Fourth Code", Duration = 3 }

            };

            _context.Courses.AddRange(courses);
            _context.SaveChanges();

            _repository = new CourseRepository(_context);
        }


        [TestMethod]
        public async Task GetAllCourses_Should_Return_The_Correct_Amount_Of_Courses_And_Be_the_Correct_Type()
        {
            // Arrange
            var courses = await _repository.GetAllCourses();

            // Act
            var result = courses.Count();
            var courseType = courses as List<Course>;

            // Assert
            Assert.IsInstanceOfType(courseType, typeof(List<Course>));
            Assert.AreEqual(4, result);
        }


        [TestMethod]
        public void FindCourseByCourseCode_Should_Return_The_Correct_Course()
        {
            // Arrange 
            // Act
            var foundCourse = _repository.FindCourseByCourseCode("Second Code");


            // Assert
            var expectedCourseTitle = "Second title";
            var expectedId = 2;

            Assert.IsInstanceOfType(foundCourse.Result, typeof(Course));
            Assert.AreEqual(expectedId, foundCourse.Result.Id);
            Assert.AreEqual(expectedCourseTitle, foundCourse.Result.Title);
        }


        [TestMethod]
        public void FindCourseByCourseCode_Should_Return_Null_For_Nonexistant_Course_Code()
        {
            // Arrange 
            // Act
            var foundCourse = _repository.FindCourseByCourseCode("Nonexistant Code");

            // Assert
            Assert.IsNull(foundCourse.Result);
        }

        [TestMethod]
        public void Create_Course_Should_Add_A_New_Course()
        {
            // Arrange 
            var newCourse = new Course() { Id = 5, Title = "Fifth title", Code = "Fifth Code", Duration = 3 };

            // Act
            var created = _repository.Create(newCourse).Result;
            var courses = _repository.GetAllCourses().Result;
            var result = courses.Count();

            // Assert
            int expectedCount = 5;

            Assert.IsInstanceOfType(created, typeof(Course));
            Assert.AreEqual(expectedCount, result);
            Assert.IsInstanceOfType(courses[4], typeof(Course));
        }


    }
}
    
