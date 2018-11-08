using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace SportGame.Repository
{
    public class CountryRepository
    {
        #region Fields and Method
        private readonly AppDbContext _db;

        #endregion

        public CountryRepository(AppDbContext db)
        {
            _db = db;
        }
        public async Task<IList<Country>> GetAllCountry()
        {
            return await _db.Country.FromSql("GetAllCountry").ToListAsync();
        }
        public async Task<int> SaveCountry(Country country)
        {
            var NewCountry = new SqlParameter("@CountryName", country.CountryName );
            var NewCountrytwo = new SqlParameter("@SportId", country.SportId);
            return await _db.Database.ExecuteSqlCommandAsync("CreateCountry @CountryName,@SportId", NewCountry, NewCountrytwo);
        }
        public async Task<int> EditCountry(Country country)
        {
            var update = await _db.Database.ExecuteSqlCommandAsync($"EditCountry {country.CountryId}, {country.CountryName}");

            return update;
        }
        public async Task<int> DeleteCountry(int id)
        {
            var delete = await _db.Database.ExecuteSqlCommandAsync($"DeleteCountry {id}");

            return delete;
        }
        public async Task<int> GetCountryById(int id)
        {
            var Get = await _db.Database.ExecuteSqlCommandAsync($"GetCountryById {id}");

            return Get;
        }
    }
}
