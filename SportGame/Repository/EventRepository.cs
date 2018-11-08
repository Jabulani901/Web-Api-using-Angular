using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace SportGame.Repository
{
    public class EventRepository
    {
        #region Fields and Method
        private readonly AppDbContext _db;

        #endregion

        public EventRepository(AppDbContext db)
        {
            _db = db;
        }
        public async Task<IList<EventGames>> GetAllSport()
        {
            return await _db.Events.FromSql("GetAllEvent").ToListAsync();
        }
        public async Task<EventGames> SaveEvent(EventGames events)
        {
            var NewEvent = new SqlParameter("@EventName", events.EventName);
            var NewTtwo = new SqlParameter("@TId", events.TId);
            return await _db.Events.FromSql("CreateEvent @EventName,@TId", NewEvent, NewTtwo).FirstOrDefaultAsync();
        }
        public async Task<IList<EventGames>> EditEvent(EventGames events)
        {
            var update = await _db.Events.FromSql($"EditEvent {events.EventId}, {events.EventName},{events.DateH}").ToListAsync(); 
            return update;
        }
        public async Task<IList<EventGames>> DeleteEvent(int id)
        {
            var delete = await _db.Events.FromSql($"DeleteEvent {id}").ToListAsync();
            return delete;
        }
        public async Task<int> GetEventById(int id)
        {
            var Get = await _db.Database.ExecuteSqlCommandAsync($"GetEventById {id}");
            return Get;
        }

    }
}
