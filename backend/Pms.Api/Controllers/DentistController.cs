using Microsoft.AspNetCore.Mvc;
// Just a dummy controller, dentists would normally be their own entity, with schedules and other details.
// Still made them a controller instead of just hardcoding strings in the frontend, to highlight that we fetch the list from the backend
namespace Pms.Api.Controllers
{
    [ApiController]
    [Route("api/dentists")]
    public class DentistsController : ControllerBase
    {   

        private static readonly string[] AllDentists =
        [
            "Dr. Vlad",
            "Dr. Johann",
            "Dr. Paul",
            "Dr. Nicolas"
        ];

        [HttpGet]
        public IActionResult GetAllDentists()
        {
            return Ok(AllDentists);
        }
    }
}