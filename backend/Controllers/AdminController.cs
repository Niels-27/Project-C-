using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class AdminController : Controller
    {

        FashionContext _context;

        public AdminController (FashionContext context) {
            _context = context;
        }
        // GET api/admin/products/all
        [HttpGet("products/all")]
        public IQueryable<Product> GetAllProducts()
        {
            var result = from m in _context.Products select m;
            return result;
        }
        // GET api/admin/users/all
        [HttpGet("users/all")]
        public IQueryable<User> GetAllUsers()
        {
            var result = from m in _context.Users select m;
            return result;
        }

        // GET api/admin/products/id
        [HttpGet("products/{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _context.Products.FirstOrDefault (t => t.Id == id);
            if (product == null){
                return NotFound();
            }
            return new ObjectResult(product);
        }
         // GET api/admin/users/id
        [HttpGet("users/{id}")]
        public IActionResult GetUserByName(string name)
        {
            var user = _context.Users.FirstOrDefault (t => t.Name == name);
            if (user == null){
                return NotFound();
            }
            return new ObjectResult(user);
        }

        // POST api/admin/categories/create
        [HttpPost("users/create")]
        public IActionResult PostCategory([FromBody]User user)
        {
            if(user == null){
                return NoContent();
            }
            _context.Users.Add(user);
            // _context.Addresses.Add(user_address)
            _context.SaveChanges();
            return Ok();

        }

       // PUT api/admin/products/id
        [HttpPut("products/update/{id}")]
        public IActionResult PutProduct(int id, [FromBody]Product product_edit)
        {
            if(product_edit == null){
                return NoContent();
            }
            var product = _context.Products.FirstOrDefault (m => m.Id == id);
            product.Name = product_edit.Name;
            product.Amount = product_edit.Amount;
            product.Price = product_edit.Price;
            product.Description = product_edit.Description;
            product.Color = product_edit.Color;
            product.ProductSizeId = product_edit.ProductSizeId;
            product.ImageName = product_edit.ImageName;
            product.Discount = product_edit.Discount;
            product.ProductSold = product_edit.ProductSold;
            product.WishListProducts = product_edit.WishListProducts;
            product.Categories = product_edit.Categories;

            var result = _context.Products.Update(product);
            _context.SaveChanges();

            return Ok();
        }
               // PUT api/admin/products/id
        [HttpPut("users/update/{id}")]
        public IActionResult PutUser(int id, [FromBody]User user_edit)
        {
            if(user_edit == null){
                return NoContent();
            }
            var user = _context.Users.FirstOrDefault (m => m.Id == id);
            user.Name = user_edit.Name;
            user.Email = user_edit.Email;
            user.Password = user_edit.Password;
            user.Salt = user_edit.Salt;
            user.Ip = user_edit.Salt;
            user.Rank = user_edit.Rank;
            user.ProductsSold = user_edit.ProductsSold;
            user.Orders = user_edit.Orders;
            user.WishListProducts = user_edit.WishListProducts;
            user.Addresses = user_edit.Addresses;
            var result = _context.Users.Update(user);
            _context.SaveChanges();

            return Ok();
        }

        // DELETE api/admin/products/id
        [HttpDelete("products/delete/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var result = (from m in _context.Products where m.Id ==  id select m).FirstOrDefault();
            if(result == null){
                return NoContent();
            }
            _context.Products.Remove(result);
            _context.SaveChanges();

            return Ok();
        }

        // DELETE api/admin/users/id
        [HttpDelete("users/delete/{id}")]
        public IActionResult DeleteUser(int id)
        {
            var result = (from m in _context.Users where m.Id ==  id select m).FirstOrDefault();
            if(result == null){
                return NoContent();
            }
            _context.Users.Remove(result);
            _context.SaveChanges();

            return Ok();
        }

                // DELETE api/admin/products/all
        [HttpDelete("users/delete/all")]
        public IActionResult DeleteAllProducts()
        {
            var result = (from m in _context.Products select m).ToList();
            if(result == null){
                return NoContent();
            }
            foreach(var product in result){
                _context.Products.Remove(product);
            }
            
            _context.SaveChanges();

            return Ok();
        }
    }
}
