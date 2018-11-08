using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace SportGame.Repository
{
    public class TournamentRepository
    {
        #region Fields and Method
        private readonly AppDbContext _db;

        #endregion

        public TournamentRepository(AppDbContext db)
        {
            _db = db;
        }
        public async Task<IList<Tournament>> GetAllTournament()
        {
            return await _db.Tournaments.FromSql("GetAllTournament").ToListAsync();
        }
        public async Task<Tournament> SaveTournament(Tournament tournament)
        {
            var NewT = new SqlParameter("@TName", tournament.TName);
            var NewTtwo = new SqlParameter("@CountryId", tournament.CountryId);
            return await _db.Tournaments.FromSql("CreateTournament @TName,@CountryId", NewT, NewTtwo).FirstOrDefaultAsync();
        }
        public async Task<IList<Tournament>> EditTournament(Tournament tournament)
        {
            var update = await _db.Tournaments.FromSql($"EditTournament {tournament.TId}, {tournament.TName}").ToListAsync();
            return update;
        }
        public async Task<IList<Tournament>> DeleteTournament(int id)
        {
            var delete = await _db.Tournaments.FromSql($"DeleteTournament {id}").ToListAsync();
            return delete;
        }
        public async Task<int> GetTournamentById(int id)
        {
            var Get = await _db.Database.ExecuteSqlCommandAsync($"GetTournamentById {id}");
            return Get;
        }
    }
}
