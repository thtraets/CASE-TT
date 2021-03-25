using API.Controllers;
using API.Utils;
using DAL.Interfaces;
using DomainClasses;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;


namespace API.UnitTests
{
    public class CourseInstancesControllerTests
    {
        [Fact]
        public void GetAllCourseInstances_From_Controller_Should_Return_A_List_Of_Courses_And_Contain_Correct_Number_Of_Courses()
        {
            // Arrange
            var instanceMockRepo = new Mock<ICourseInstanceRepository>();
            instanceMockRepo.Setup(repo => repo.GetAllCourseInstances())
                .ReturnsAsync(GetAllCourseInstancesTestSessions());

            var controller = new CourseInstancesController(instanceMockRepo.Object);

            // Act
            var result = controller.GetAllCourseInstances();

            // Assert
            var viewResult = Assert.IsType<Task<List<CourseInstance>>>(result);
            var model = Assert.IsAssignableFrom<List<CourseInstance>>(viewResult.Result);
            Assert.Equal(2, model.Count());
        }


        private List<CourseInstance> GetAllCourseInstancesTestSessions()
        {
            var sessions = new List<CourseInstance>
            {
                new CourseInstance()
                {
                    Id = 1,
                    StartDate = DateTime.Now,
                    Course = new Course()
                    {
                        Id = 2,
                        Title = "Second title",
                        Code = "Second Code",
                        Duration = 3
                    }
                },
                new CourseInstance()
                {
                    Id = 1,
                    StartDate = DateTime.Now,
                    Course = new Course()
                    {
                        Id = 1,
                        Title = "First title",
                        Code = "First Code",
                        Duration = 5
                    }
                }
            };
            return sessions;
        }
    }
}
