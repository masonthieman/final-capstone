using GoThro.Models;
using GoThro.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Security.Claims;

namespace GoThro.Controllers
{
    public class StateController : ControllerBase
    {
        private readonly IStateRepository _stateRepository;
        public StateController(IStateRepository stateRepository)
        {
            _stateRepository = stateRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_stateRepository.GetAll());
        }

        [HttpGet("{stateId}")]
        public IActionResult GetState(int stateId)
        {
            return Ok(_stateRepository.GetById(stateId));
        }
    }
}
