using System;
using System.IO;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using backend.Models;
using backend.DTOs;
using Npgsql;

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
        // private static readonly Expression<Func<RegisterUserDto, User>> AsUser = 
        //     x => new User
        //     { 
        //         Id = x.Id,
        //         Name = x.Firstname + " " + x.Lastname,
        //         Email = x.Email,
        //         Password = x.Password,
        //         Salt = x.Salt,
        //         Ip = x.Ip,
        //         Street = x.Street,
        //         Password = x.Password,
        //         ZipCode = x.ZipCode,
        //         City = x.City,
        //         Country = x.Country
        //     };
                private string RequestBody;
        [HttpPost]
        [Route("testuser")]
        public async Task<List<string>> ReadStringDataManual()
        {
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }
            dynamic userData = JValue.Parse(this.RequestBody);

            //System.Console.WriteLine(derp);
            //return productIds.items[0];

            return handleBodyPost(userData);
        }

        private List<string> handleBodyPost(dynamic array)
        {     
             List<string> ItemsList = new List<string>();
            foreach (var item in array)
            {
                ItemsList.Add(item.ToString());
            }
            return (ItemsList);

        }

    }
}
