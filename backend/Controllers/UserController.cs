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
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using backend.Models;
using backend.DTOs;
using backend.Services;
using Npgsql;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        FashionContext _context;
        IUserService _userService;


        public UserController (FashionContext context, IUserService userService) {
            _context = context;
            _userService = userService;
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
        public string ScanEmail(string email)  // deze functie kijkt of de email al in gebruik is door database check.
        {
           var user = _context.Users.Where(u => u.Email == email).Select(u=> u);
           if(user.Any()){
               return "Dit emailadres is al in gebruik.";
           }
           return "";
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
            DateTime createDate = DateTime.UtcNow;
            User new_user = new User(){
                Name = user.firstname + " " + user.lastname,
                Email = user.email,
                Rank = 1,
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
          private string AuthenticateUser(string email, dynamic password){
            string encodedSalt, encodedKey;
            encodedSalt = _context.Users.Where(u => u.Email == email).Select(u => u.Salt).FirstOrDefault();//load salt based on email
            encodedKey = _context.Users.Where(u => u.Email == email).Select(u => u.Key).FirstOrDefault(); //load key based on email
            if(encodedKey == null || encodedSalt == null ){
                return "Er is een error.";
                }
            
            byte[] salt = Convert.FromBase64String(encodedSalt);//convert to byte
            byte[] key = Convert.FromBase64String(encodedKey); //convert to byte

            using (var deriveBytes = new Rfc2898DeriveBytes(password, salt))
            {
                byte[] testKey = deriveBytes.GetBytes(20); // 20-byte key
                if (!testKey.SequenceEqual(key))  
                 return "Het wachtwoord klopt niet.";
                else
                return "";  //Het wachtwoord klopt geen message
            }
        }


        [HttpGet]
        [Route("testuser/{email=string}/{password=string}")]
        public string CheckUser(string email, string password)  //Deze functie kijkt of wachtwoord met email klopt.
        {
           var user = _context.Users.Where(u => u.Email == email).Select(u=> u);
           if(!user.Any()){
               return "Het emailadres bestaat niet.";
           }
            return AuthenticateUser(email, password);
        } 

        [AllowAnonymous]
        [HttpPost]
        [Route("authenticate")]
        public async Task<IActionResult> Authenticate()
        {
             using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
                 Console.WriteLine(this.RequestBody);
            }
           
            dynamic userData = JValue.Parse(this.RequestBody);
            Console.WriteLine(userData);
            return handleshit(userData);
           
        }
        public IActionResult  handleshit(dynamic user){
             var _user = _userService.AuthenticateWithToken(user.email.ToString());

            if (_user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(_user);
        }
                 
    }
}
