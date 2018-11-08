using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportGame.Repository;

namespace SportGame.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        // GET: api/Event
        private readonly AppDbContext _db;

        public EventController(AppDbContext db)
        {
            _db = db;
        }
        [BindProperty]
        public EventGames eventGames { get; set; }
        string message;
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<EventGames>> Get()
        {
            return _db.Events.FromSql("GetAllEvent").ToList();
        }

        // GET api/tournament/5
        [HttpGet("{id}")]
        public async Task<EventGames> Get(int id)
        {
            return await _db.Events.FromSql($"GetEventById {id}").FirstOrDefaultAsync();
        }
        // POST api/Tournament
        [HttpPost]
        public async Task<EventGames> PostAsync([FromBody] EventGames events)
        {
            try
            {
                var eventRepo = new EventRepository(_db);
                var result = await eventRepo.SaveEvent(events);
                return result;
            }
            catch (Exception ex)
            {
                message = ex.Message;
            }
           

            return null;
        }
        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IList<EventGames>> PutAsync([FromBody] EventGames events)
        {
            try
            {
                var eventRepo = new EventRepository(_db);
                var result = await eventRepo.EditEvent(events);
                return result;
            }
            catch (Exception ex)
            {
                message = ex.Message;
            }
            return null;
        }
        // DELETE api/values/5
        [HttpDelete("{id}")]
        public Task<IList<EventGames>> Delete(int id)
        {
            try
            {
                var eventRepo = new EventRepository(_db);
                var result = eventRepo.DeleteEvent(id);

                return result;
            }
            catch (Exception ex)
            {

                message = ex.Message;
            }
            return null;
        }
    }
}
