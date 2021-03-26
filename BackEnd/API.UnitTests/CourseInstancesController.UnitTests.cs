using API.Controllers;
using API.Utils;
using DAL.Interfaces;
using DomainClasses;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Globalization;
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


        [Fact]
        public void GetAllCourseInstancesPerGivenWeek_From_Controller_Should_Return_Instances_From_That_Given_Week_And_Year()
        {
            // Arrange
            var instanceMockRepo = new Mock<ICourseInstanceRepository>();
            instanceMockRepo.Setup(repo => repo.GetAllCourseInstances())
                .ReturnsAsync(GetAllCourseInstancesTestSessions());

            //int weeknr = ISOWeek.GetWeekOfYear(DateTime.Parse("26-03-2021"));
            //int year = ISOWeek.GetYear(DateTime.Parse("26-03-2021"));

            instanceMockRepo.Setup(repo => repo.GetAllCourseInstancesPerGivenWeek(12,2021))
                .ReturnsAsync(GetAllCourseInstancesTestSessions());

            var controller = new CourseInstancesController(instanceMockRepo.Object);

            // Act
            var result = controller.GetAllCourseInstancesPerGivenWeek(12,2021);

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
                    StartDate = DateTime.Parse("26-03-2021"),
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
                    StartDate = DateTime.Parse("12-03-2021"),
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
