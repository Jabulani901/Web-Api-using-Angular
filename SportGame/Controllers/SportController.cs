using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportGame.Repository;

namespace SportGame.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    
    public class SportController : ControllerBase
    {
        string message;
        private readonly AppDbContext _db;

        public SportController(AppDbContext db)
        {
            _db = db;
        }
        [BindProperty]
        public Sport Sports { get; set; }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Sport>> Get()
        {
            return _db.Sports.FromSql("GetAllSport").ToList();
        }

        // GET api/sport/5
        [HttpGet("{id}")]
        public async Task<Sport> Get(int id)
        {
            return await _db.Sports.FromSql($"GetSportById {id}").FirstOrDefaultAsync();
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] Sport sport)
        {
            var sportRepo = new SportRepository(_db);
            var result = await sportRepo.SaveSport(sport);

            return NoContent();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync([FromBody] Sport sport)
        {
            var sportRepo = new SportRepository(_db);
            var result = await sportRepo.EditSport(sport);

            return NoContent();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            try
            {
                var SportRepo = new SportRepository(_db);
                var result = SportRepo.DeleteSport(id);
            }
            catch (Exception ex)
            {
                message = ex.Message;
            }
            
        }
    }
}
