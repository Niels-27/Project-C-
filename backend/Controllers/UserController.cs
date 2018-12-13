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
        public IEnumerable<Country> GetCountries(){  //

            var dbList = _context.Countries.Select(m => m).ToList();
            if (dbList==null){
                var alternativeList = new List<Country>(){new Country {Id=1, Name = "Nederland"}};
                return alternativeList;
            }     
            return dbList;
        }
        [HttpPost]
        [Route("checkemail")]    
        public async Task<string> ScanEmail()  // deze functie kijkt of de email al in gebruik is door database check.
        {
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }
            dynamic userData = JValue.Parse(this.RequestBody);
            string email = userData.email;
            
            var user = _context.Users.Where(u => u.Email == email).Select(u=> u);
            if(user.Any()){
                return "Dit emailadres is al in gebruik.";
            }
            return "";
        }       
        private string RequestBody;
        [HttpPost]
        [Route("register")]   //deze functie registreert een gebruiker
        public async Task<User> ReadStringDataManual()
        {
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }      
            dynamic userData = JValue.Parse(this.RequestBody);
            return handleBodyPost(userData);
        }        
        private User handleBodyPost(dynamic user)  // Deze functie handlet de user registratie verder
        {    
            DateTime createDate = DateTime.UtcNow;
            User new_user = new User(){
                Name = user.firstname + " " + user.lastname,
                Email = user.email,
                Gender = user.gender,
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

            var encodedUser = EncodeAndStoreUser(new_user, user.password, true);    // encode user password

            backend.Services.MailService MailService = new backend.Services.MailService();
            MailService.email = user.email;
            MailService.setCustomMessage("Registratie HR Fashion!", "Beste " + user.firstname + ", \n Bedankt voor uw registratie bij HR Fashion u kunt nu inloggen!\n\n met uw account kunt u: \nJe krijgt overzicht op al je bestellingen\nHoud een Wishlist bij\nBestel sneller producten\n\n Met vriendelijke groeten HR Fashion");
            MailService.sendEmail();

            return (encodedUser);
        }
        private User EncodeAndStoreUser(User user, dynamic password, bool addOrNot){  //Deze functie encode de password en storet daarna de user in de database
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
            if(addOrNot){
                _context.Add(user); 
            }
            else{
                _context.Update(user);
            }
              //add user to database
            _context.SaveChanges();
            }
            return user;
        }
          private string AuthenticateUser(string email, dynamic password){ // deze functie kijkt of het wachtwoord klopt
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
                return "";  //Het wachtwoord klopt 
            }
        }
        [HttpPost]
        [Route("checkuser")]   
        public async Task<string> CheckUser()  //Deze functie kijkt of wachtwoord met email klopt.
        {
             using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }
           
        dynamic userData = JValue.Parse(this.RequestBody);
        string email = userData.email;
        string pass = userData.password;

        var user = _context.Users.Where(u => u.Email == email).Select(u=> u);
           if(!user.Any()){
               return "Het emailadres bestaat niet.";
           }
            return AuthenticateUser(email, pass);
        } 

        [HttpPost]
        [Route("authenticate")]  //Deze functie geeft de userdata  van de loginform
        public async Task<IActionResult> Authenticate()
        {
             using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }
           
            dynamic userData = JValue.Parse(this.RequestBody);
            return handleAuthentication(userData);
           
        }
        public IActionResult  handleAuthentication(dynamic user){  //deze functie authoriseerrt de user met een token
             var _user = _userService.AuthenticateWithToken(user.email.ToString());

            if (_user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(_user);
        }

         [HttpPost]
        [Route("getUserInfo")]
        public async Task<IActionResult> GetUserData() // deze functie haalt de data op van de user
        {
             using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }
           
            dynamic userData = JValue.Parse(this.RequestBody);
            int userID = Int32.Parse(userData.unique_name.ToString());


            var user = _context.Users.Where(u => u.Id == userID).Select(u => u).FirstOrDefault();
            user.Key = "";
            user.Salt = "";
            
            Console.WriteLine("this is the userID: " + userID);
            System.Console.WriteLine(user);
            return Ok(user);          
        }
         [HttpPost]
        [Route("getAddressInfo")] 
        public async Task<IActionResult> GetAddressData()  //deze functie haalt de adress data op van de user
        {
             using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }
           
            dynamic userData = JValue.Parse(this.RequestBody);
            int userID = Int32.Parse(userData.unique_name.ToString());
            var address = _context.Addresses.Where(u => u.UserId == userID).Include(c => c.Country).OrderBy(t => t.Id).Select(u => u).FirstOrDefault();
   
            return Ok(address);          
        }
         [HttpPost]
         [Route("getWishListInfo")]
        public async Task<IActionResult> GetWishListData()  //deze functie haalt de wishlist data van de user
        {
             using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }
           
            dynamic userData = JValue.Parse(this.RequestBody);
            int userID = Int32.Parse(userData.unique_name.ToString());

            var wishlist = _context.WishListProducts.Where(u => u.Id == userID).Select(u => u.Product).ToList();  //list with products
    
            return Ok(wishlist);          
        }
         [HttpPost]
        [Route("updateUser/personal")]
         public async Task<IActionResult> UpdateUserPersonal()  //deze functie haalt de wishlist data van de user
        {
             using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }   
            dynamic up = JValue.Parse(this.RequestBody);
            int userID = Int32.Parse(up.id.ToString());

            User user = _context.Users.Where(u => u.Id == userID).Select(u => u).FirstOrDefault();
            user.Name = up.firstname + " " + up.lastname;
            user.Email = up.email;
            _context.Users.Update(user);
            _context.SaveChanges();
            
            return Ok(user);          
        }
          [HttpPost]
        [Route("updateUser/address")]
         public async Task<IActionResult> UpdateUserAddress()  //deze functie haalt de wishlist data van de user
        {
             using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }   
            dynamic up = JValue.Parse(this.RequestBody);
            int id = Int32.Parse(up.id.ToString());

            Address address = _context.Addresses.Where(a => a.Id == id).Select(a => a).FirstOrDefault();
            address.Street = up.street + " " + up.streetnumber;
            address.PostalCode = up.zipcode;
            address.City = up.city;

            _context.Addresses.Update(address);
            _context.SaveChanges();
            
            return Ok(address);          
        }
          [Route("updateUser/password")]
         public async Task<IActionResult> UpdatePassword()  //deze functie haalt de wishlist data van de user
        {
             using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }   
            dynamic up = JValue.Parse(this.RequestBody);
            int id = Int32.Parse(up.id.ToString());

            User user = _context.Users.Where(u => u.Id == id).Select(u => u).FirstOrDefault();

            var encodedUser = EncodeAndStoreUser(user, up.newPassword, false);
            
            return Ok(encodedUser);          
        }
                 
    }
}
