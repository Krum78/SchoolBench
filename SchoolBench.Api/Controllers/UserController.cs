﻿using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolBench.Api.Models;

namespace SchoolBench.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            if (Request.HttpContext?.User?.Identity is ClaimsIdentity identity)
            {
                User user = new User
                {
                    Login = identity.Name,
                    Roles = identity.Claims.Where(c => c.Type == identity.RoleClaimType).Select(c => c.Value).ToArray(),
                    Email = identity.Claims.FirstOrDefault(c => c.Type == "email")?.Value
                };
                return Ok(user);
            }

            return NotFound();
        }
    }
}