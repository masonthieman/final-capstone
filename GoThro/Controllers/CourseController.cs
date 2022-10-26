using GoThro.Models;
using GoThro.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Security.Claims;

namespace GoThro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class CourseController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;

        public CourseController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_courseRepository.GetAll());
        }
        [HttpPost]
        public IActionResult Post(Course course)
        {
           // course.UserId = 1;

            

            if (string.IsNullOrWhiteSpace(course.ImageLocation))
            {
                course.ImageLocation = null;
            }


            _courseRepository.Add(course);

            return NoContent();
        }
       
    }
}
