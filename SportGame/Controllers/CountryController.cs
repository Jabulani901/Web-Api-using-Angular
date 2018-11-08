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
        public class CountryController : ControllerBase
        {
        string message;
            private readonly AppDbContext _db;

            public CountryController(AppDbContext db)
            {
                _db = db;
            }
            [BindProperty]
            public Country country { get; set; }

            // GET api/values
            [HttpGet]
            public ActionResult<IEnumerable<Country>> Get()
            {
                return _db.Country.FromSql("GetAllCountry").ToList();
            }

            // GET api/sport/5
            [HttpGet("{id}")]
            public async Task<Country> Get(int id)
            {
                return await _db.Country.FromSql($"GetCountryById {id}").FirstOrDefaultAsync();
            }

            // POST api/values
            [HttpPost]
            public async Task<IActionResult> PostAsync([FromBody] Country country)
            {
                var countryRepo = new CountryRepository(_db);
                var result = await countryRepo.SaveCountry(country);

                return NoContent();
            }
            // PUT api/values/5
            [HttpPut("{id}")]
            public async Task<IActionResult> PutAsync([FromBody] Country country)
            {
                var countryRepo = new CountryRepository(_db);
                var result = await countryRepo.EditCountry(country);

                return NoContent();
            }
            // DELETE api/values/5
            [HttpDelete("{id}")]
            public void Delete(int id)
            {
            try
            {

                var countryRepo = new CountryRepository(_db);
                var result = countryRepo.DeleteCountry(id);
            }
            catch (Exception ex)
            {

                message = ex.Message;
            }
            }
        }
    }