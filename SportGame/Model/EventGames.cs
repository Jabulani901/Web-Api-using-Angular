using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SportGame
{
    public class EventGames
    {
        [Key]
        public int EventId { get; set; }

        public string EventName { get; set; }

        public int TId { get; set; }

        public DateTime DateH { get; set; }

        public string TName { get; set; }

        public string SportName { get; set; }

        public string CountryName { get; set; }


    }
}
