using API.Controllers;
using DAL.Interfaces;
using DomainClasses;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace API.UnitTests
{
    public class CoursesControllerTests 
    {
        [Fact]
        public void GetAllCourses_Should_Return_A_List_Of_Courses_And_Contain_Correct_Number_Of_Courses()
        {
            // Arrange
            var mockRepo = new Mock<ICourseRepository>();
            mockRepo.Setup(repo => repo.GetAllCourses())
                .ReturnsAsync(GetTestSessions());
            var controller = new CoursesController(mockRepo.Object);

            // Act
            var result = controller.GetAllCourses();

            // Assert
            var viewResult = Assert.IsType<Task<List<Course>>>(result);
            var model = Assert.IsAssignableFrom<List<Course>>(
                viewResult.Result);
            Assert.Equal(2, model.Count());
        }

        private List<Course> GetTestSessions()
        {
            var sessions = new List<Course>();
            sessions.Add(new Course()
            {
                Id = 1,
                Title = "Course One",
                Duration = 5,
                Code = "Code one"
            });
            sessions.Add(new Course()
            {
                Id = 2,
                Title = "Course Two",
                Duration = 2,
                Code = "Code Two"
            });
            return sessions;
        }
    }
}
