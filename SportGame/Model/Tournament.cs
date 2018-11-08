using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SportGame
{
    public class Tournament
    {
        [Key]
        public int TId { get; set; }

        public string TName { get; set; }

        public int CountryId { get; set; }

        public string CountryName { get; set; }
        
        public string sportName { get; set; }
    }
   
}
