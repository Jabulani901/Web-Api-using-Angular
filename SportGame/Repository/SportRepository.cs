using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace SportGame.Repository
{
    public class SportRepository
    {
        #region Fields and Method
        private readonly AppDbContext _db;

        #endregion

        public SportRepository(AppDbContext db)
        {
            _db = db;
        }
        public async Task<IList<Sport>> GetAllSport()
        {
            return await _db.Sports.FromSql("GetAllSport").ToListAsync();
        }
        public async Task<int> SaveSport(Sport sport)
        {
            var NewSport = new SqlParameter("@SportName", sport.SportName);

            return await _db.Database.ExecuteSqlCommandAsync("CreateSport @SportName ", NewSport);
        }
        public async Task<int> EditSport(Sport sport)
        {
            var update = await _db.Database.ExecuteSqlCommandAsync($"EditSport {sport.SportId}, {sport.SportName}");

            return update;
        }
        public async Task<int> DeleteSport(int id)
        {
            var delete = await _db.Database.ExecuteSqlCommandAsync($"DeleteSport {id}");

            return delete;
        }
        public async Task<int> GetSportById(int id)
        {
            var Get = await _db.Database.ExecuteSqlCommandAsync($"GetSportById {id}");

            return Get;
        }
    }
}
