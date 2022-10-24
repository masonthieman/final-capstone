using GoThro.Models;
using GoThro.Repositories;
using Microsoft.AspNetCore.Mvc;
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
    }
}
