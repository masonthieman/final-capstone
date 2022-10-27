using GoThro.Models;
using GoThro.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
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
            return Ok(_courseRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_courseRepository.GetById(id));
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
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
