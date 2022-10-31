using GoThro.Models;
using GoThro.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace GoThro.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    
    public class CourseController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public CourseController(
            ICourseRepository courseRepository,
            IUserProfileRepository userProfileRepository)
        {
            _courseRepository = courseRepository;
            _userProfileRepository = userProfileRepository;
            
        }

        [HttpGet]
        public IActionResult Get()
        {
            int userId = GetCurrentUserProfile().Id;
            List<Course> courses = _courseRepository.GetAll();
            List<int> playedCourses = _courseRepository.GetUserPlayedCourses(userId);
            if (playedCourses.Count > 0)
            {
                foreach (var course in courses)
                {
                    if (playedCourses.Contains(course.Id))
                    {
                        course.PlayedByUser = true;
                    }
                }
            }
            
            
            return Ok(courses);
        }

        [HttpGet("{id}")]
        public IActionResult GetByCourseId(int id)
        {
            return Ok(_courseRepository.GetById(id));
        }
        [HttpGet("UserPlayedCourses")]
        public IActionResult GetUserPlayedCourse()
        {
            int userId = GetCurrentUserProfile().Id;
            return Ok(_courseRepository.GetUserPlayedCourses(userId));
            
        }
        [HttpPost]
        public IActionResult Post(Course course)
        {
            course.UserId = GetCurrentUserProfile().Id;

            

            if (string.IsNullOrWhiteSpace(course.ImageLocation))
            {
                course.ImageLocation = null;
            }


            _courseRepository.Add(course);

            return NoContent();
        }
        [HttpPost("played/{id}")]
        public IActionResult PostPlayedCourse(int id,Course course)
        {
            int userId = GetCurrentUserProfile().Id;
            _courseRepository.AddPlayedCourse(userId, course.Id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Course course)
        {
            if (id != course.Id)
            {
                return BadRequest();
            }

            _courseRepository.UpdateCourse(course);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _courseRepository.DeleteCourse(id);
            return NoContent();
        }
        [HttpDelete("played/{id}")]
        public IActionResult DeletePlayedCourseById(int courseId)
        {
            int userId = GetCurrentUserProfile().Id;
            _courseRepository.DeletePlayedCourse(userId, courseId);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
