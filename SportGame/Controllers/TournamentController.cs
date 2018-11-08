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
    public class TournamentController : ControllerBase
    {
        private readonly AppDbContext _db;
        string message;
        public TournamentController(AppDbContext db)
        {
            _db = db;
        }
        [BindProperty]
        public Tournament tournament{ get; set; }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Tournament>> Get()
        {
            return _db.Tournaments.FromSql("GetAllTournament").ToList();
        }

        // GET api/tournament/5
        [HttpGet("{id}")]
        public async Task<Tournament> Get(int id)
        {
            return await _db.Tournaments.FromSql($"GetTournamentById {id}").FirstOrDefaultAsync();
        }

        // POST api/Tournament
        [HttpPost]
        public async Task<Tournament> PostAsync([FromBody] Tournament tournament)
        {
            var tournamentRepo = new TournamentRepository(_db);
            var result = await tournamentRepo.SaveTournament(tournament);

            return result;
        }
        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IList<Tournament>> PutAsync([FromBody] Tournament tournament)
        {
            try
            {
                var tournamentRepo = new TournamentRepository(_db);
                var result = await tournamentRepo.EditTournament(tournament);
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
        public Task<IList<Tournament>> Delete(int id)
        {
            try
            {
                var tournamentRepo = new TournamentRepository(_db);
                var result = tournamentRepo.DeleteTournament(id);
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
