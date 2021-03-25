using DAL.Data;
using DAL.Repositories;
using DomainClasses;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.UnitTests
{
    [TestClass]
    public class CourseInstanceRespositoryTests
    {
        private ApplicationDBContext _context;
        private DbContextOptions<ApplicationDBContext> _options;
        private CourseInstanceRepository _repository;

        [TestInitialize]
        public void Initialize()
        {
            string dataBaseName = Guid.NewGuid().ToString();
            _options = new DbContextOptionsBuilder<ApplicationDBContext>()
                .UseInMemoryDatabase(databaseName: dataBaseName)
                .Options;
            _context = new ApplicationDBContext(_options);
            _context.Database.EnsureDeleted();

            List <Course> courses = new List<Course>()
            {
                new Course() { Id = 1, Title = "First title",  Code = "First Code", Duration = 5},
                new Course() { Id = 2, Title = "Second title", Code = "Second Code", Duration = 2 },
                new Course() { Id = 3, Title = "Third title", Code = "Third Code", Duration = 5 },
                new Course() { Id = 4, Title = "Fourth title", Code = "Fourth Code", Duration = 3 }
            };

            List<CourseInstance> courseInstances = new List<CourseInstance>()
            {
                new CourseInstance() { Id = 1, StartDate = DateTime.Parse("12-05-2021"), Course = courses[0]},
                new CourseInstance() { Id = 2, StartDate = DateTime.Parse("13-03-2021"), Course = courses[1]},
                new CourseInstance() { Id = 3, StartDate = DateTime.Parse("10-06-2021"), Course = courses[2]},
                new CourseInstance() { Id = 4, StartDate = DateTime.Parse("15-03-2021"), Course = courses[3]},
            };

            _context.CourseInstances.AddRange(courseInstances);
            _context.SaveChanges();

            _repository = new CourseInstanceRepository(_context);
        }

        [TestMethod]
        public async Task GetAllCourseInstances_Should_Return_The_Instances_Sorted_On_Ascending_Date()
        {
            // Arrange
            var instances = await _repository.GetAllCourseInstances();

            // Act
            // Assert
            for (int i = 0; i < instances.Count - 1; i++)
            {
                Assert.IsTrue(instances[i].StartDate < instances[i + 1].StartDate);
            }
        }

        [TestMethod]
        public void GetAllCourseInstances_Should_Return_The_Correct_Amount_Of_CourseInstances_And_Be_the_Correct_Type()
        {
            // Arrange
            var courseInstances = _repository.GetAllCourseInstances().Result;

            // Act
            var result = courseInstances.Count();
            var courseInstancesType = courseInstances as List<CourseInstance>;

            // Assert
            int expectedCount = 4;

            Assert.IsInstanceOfType(courseInstancesType, typeof(List<CourseInstance>));
            Assert.AreEqual(expectedCount, result);
        }

        [TestMethod]
        public async Task GetAllCourseInstances_Should_Also_Eagerly_Load_The_Related_Course()
        {
            // Arrange
            var courseInstances = await _repository.GetAllCourseInstances();

            // Act
            var resultTitle = courseInstances[0].Course.Title;
            var resultId = courseInstances[1].Course.Id;

            // Assert
            Assert.IsInstanceOfType(courseInstances[0].Course, typeof(Course));
            Assert.IsNotNull(resultTitle);
            Assert.IsNotNull(resultId);
        }

        [TestMethod]
        public void Create_Instance_Should_Add_A_New_Instance()
        {
            // Arrange 
            var newInstance = new CourseInstance() { Id = 5, StartDate = DateTime.Parse("24-03-2021"), Course = new Course() { Id = 5, Title = "Fifth title", Code = "Fifth Code", Duration = 3 } };

            // Act
            var created = _repository.Create(newInstance).Result;
            var courseInstances = _repository.GetAllCourseInstances().Result;
            var result = courseInstances.Count();

            // Assert
            int expectedCount = 5;

            Assert.IsInstanceOfType(created, typeof(CourseInstance));
            Assert.AreEqual(expectedCount, result);
        }

        [TestMethod]
        public void Create_Instance_Should_Also_Add_A_New_Course()
        {
            // Arrange 
            var newCourse = new Course() { Id = 5, Title = "Fifth title", Code = "Fifth Code", Duration = 3 };
            var newInstance = new CourseInstance() { Id = 5, StartDate = DateTime.Parse("24-03-2021"), Course = newCourse };

            // Act
            var created = _repository.Create(newInstance).Result;
            var courseInstances = _repository.GetAllCourseInstances().Result;
            var result = courseInstances.Count();

            // Assert
            int expectedCount = 5;

            Assert.IsInstanceOfType(created, typeof(CourseInstance));
            Assert.AreEqual(expectedCount, result);
            Assert.IsInstanceOfType(courseInstances[4].Course, typeof(Course));
            Assert.IsNotNull(courseInstances[4].Course.Title);
            Assert.IsNotNull(courseInstances[4].Course.Duration);
        }

        [TestMethod]
        public void FindCourseInstanceDuplicate_Should_Find_The_Duplicate_Instance()
        {
            // Arrange 
            var duplicateCourse = new Course() { Id = 5, Title = "Second title", Code = "Second Code", Duration = 3 };
            var duplicateInstance = new CourseInstance() { Id = 5, StartDate = DateTime.Parse("13-03-2021"), Course = duplicateCourse };

            // Act
            var existingInstance = _repository.FindCourseInstanceDuplicate(duplicateInstance.StartDate, duplicateInstance.Course.Code);

            // Assert
            Assert.AreEqual(existingInstance.Course.Code, duplicateInstance.Course.Code);
            Assert.AreEqual(existingInstance.StartDate, duplicateInstance.StartDate);
        }

        [TestMethod]
        public void FindCourseInstanceDuplicate_Should_Return_Null_If_There_Is_No_Duplicate_Instance()
        {
            // Arrange 
            var newCourse = new Course() { Id = 5, Title = "Fifth title", Code = "Fifth Code", Duration = 3 };
            var newInstance = new CourseInstance() { Id = 5, StartDate = DateTime.Parse("24-03-2021"), Course = newCourse };

            // Act
            var existingInstance = _repository.FindCourseInstanceDuplicate(newInstance.StartDate, newInstance.Course.Code);

            // Assert
            Assert.AreEqual(existingInstance, null);
        }

        [TestMethod]
        public void FindCourseByCode_Should_Return_The_Correct_Course()
        {
            // Arrange 
            // Act
            var foundCourse = _repository.FindCourseByCode("Second Code");

            // Assert
            var expectedCourseTitle = "Second title";
            var expectedId = 2;

            Assert.IsInstanceOfType(foundCourse, typeof(Course));
            Assert.AreEqual(expectedId, foundCourse.Id);
            Assert.AreEqual(expectedCourseTitle, foundCourse.Title);
        }


        [TestMethod]
        public void FindCourseByCode_Should_Return_Null_For_Nonexistant_Course_Code()
        {
            // Arrange 
            // Act
            var foundCourse = _repository.FindCourseByCode("Nonexistant Code");

            // Assert
            Assert.IsNull(foundCourse);
        }        
    }
}
