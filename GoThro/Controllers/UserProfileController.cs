using GoThro.Models;
using GoThro.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;


namespace GoThro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("CurrentUserProfile")]
        public IActionResult GetCurrentUser()
        {
            var userProfile = GetCurrentUserProfile();

            return Ok(userProfile);
        }
        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
         
            
            _userProfileRepository.Add(userProfile);
            
            return CreatedAtAction(
               nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
               userProfile);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAllUsers());
        }
 
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
