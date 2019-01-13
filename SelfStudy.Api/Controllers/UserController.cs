using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SelfStudy.Api.Models;

namespace SelfStudy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<User>> Get()
        {
            if (Request.HttpContext?.User?.Identity is ClaimsIdentity identity)
            {
                User user = new User
                {
                    Login = identity.Name,
                    Name = identity.Name,
                    Roles = identity.Claims.Where(c => c.Type == identity.RoleClaimType).Select(c => c.Value).ToArray(),
                    Email = identity.Claims.FirstOrDefault(c => c.Type == "email")?.Value
                };

                //await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

                return Ok(user);
            }

            return NotFound();
        }
    }
}