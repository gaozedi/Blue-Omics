using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Pipeline;
using Application.SSH;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SSHController : ControllerBase
    {

        // GET api/values/5
        [HttpGet]
        public ActionResult<string> Get()
        {
            
            SSHHandler.SSHSubmit();
            return "OK";
        }

        [HttpPost]
        public async Task<string> RunCommands()
        {
            
            return "OK";
        }

    }
}