using System;
using System.IO;
using System.Text;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Security.Cryptography;
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
        [HttpGet]
        [Route("testuser/{email=string}")]
        public User ScanEmail(string email)
        {
           var user = _context.Users.Where(u => u.Email == email).Select(u=> u).FirstOrDefault();
           return user;
        }      
        private string RequestBody;
        [HttpPost]
        [Route("testuser")]
        public async Task<User> ReadStringDataManual()
        {
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
                 Console.WriteLine(this.RequestBody);
            }
           
            dynamic userData = JValue.Parse(this.RequestBody);
            //System.Console.WriteLine(derp);
            //return productIds.items[0];
            return handleBodyPost(userData);
        }

        private User handleBodyPost(dynamic user)
        {    
            Console.WriteLine(user.ip);
            string ip = user.ip;
            
            DateTime createDate = DateTime.UtcNow;
            User new_user = new User(){
                Name = user.firstname + " " + user.lastname,
                Email = user.email,
                Rank = 1,
                Ip = ip,
                CreateOn = createDate                     
            };
            string country = user.country;
            Country selectedCountry = _context.Countries.Where(c => c.Name == country).Select(c => c).FirstOrDefault();
            Address new_address = new Address(){
                Street = user.street + " " + user.streetnumber,
                PostalCode = user.zipcode,
                City = user.city,
                Country = selectedCountry,
                User = new_user
            };
            _context.Add(new_address);  //Save the user adress data

            var encodedUser = EncodeAndStoreUser(new_user, user.password);    // encode user password

            return (encodedUser);
        }
        private User EncodeAndStoreUser(User user, dynamic password){
            string stringed_password = password;
            using (var deriveBytes = new Rfc2898DeriveBytes(stringed_password, 20)) // 20-byte salt
            {
            byte[] salt = deriveBytes.Salt;
            byte[] key = deriveBytes.GetBytes(20); // 20-byte key

            string encodedSalt = Convert.ToBase64String(salt);
            string encodedKey = Convert.ToBase64String(key);

            user.Salt = encodedSalt;   //store salt into user
            user.Key = encodedKey;   //store key into user
            // store encodedSalt and encodedKey in database
            // you could optionally skip the encoding and store the byte arrays directly
            Console.WriteLine(user);
            _context.Add(user);   //add user to database
            _context.SaveChanges();
            }
            return user;
        }
    }
}
