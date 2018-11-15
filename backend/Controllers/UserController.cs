using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {

        FashionContext _context;

        public UserController (FashionContext context) {
            _context = context;
        }

        [HttpGet("country")]
        public IEnumerable<Country> GetCountries(){

            var dbList = _context.Countries.Select(m => m).ToList();
            if (dbList==null){
                var alternativeList = new List<Country>(){new Country {Id=1, Name = "Nederland"}};
                return alternativeList;
            }     
            return dbList;
        }

    }
}
