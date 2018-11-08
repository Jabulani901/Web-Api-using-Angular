using Microsoft.EntityFrameworkCore;

namespace SportGame
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Country> Country { get; set; }
        public DbSet<Sport> Sports { get; set; }
        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<EventGames> Events { get; set; }
    }
}