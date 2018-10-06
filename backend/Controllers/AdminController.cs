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

        // POST api/admin/products/create
        [HttpPost("products/create")]
        public IActionResult Post([FromBody]Product product)
        {
            if(product == null){
                return NoContent();
            }
            _context.Products.Add(product);
            _context.SaveChanges();
            return Ok();
        }

        // PUT api/products/id
        [HttpPut("products/update/{id}")]
        public IActionResult Put(int id, [FromBody]Product product_edit)
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

            var result = _context.Products.Update(product);
            _context.SaveChanges();

            return Ok();
        }

        // DELETE api/products/id
        [HttpDelete("products/delete/{id}")]
        public IActionResult Delete(int id)
        {
            var result = (from m in _context.Products where m.Id ==  id select m).FirstOrDefault();
            if(result == null){
                return NotFound();
            }
            _context.Products.Remove(result);
            _context.SaveChanges();

            return Ok();
        }
    }
}
