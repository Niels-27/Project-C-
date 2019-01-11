using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using System.Text;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
        public class countUserRegs
        {
            public string month;
            public string amount;
        }
        [HttpGet("stats/users/registrations")]
  
        public List<string> StatsGetAllUsers()
        {
            var thisYear = DateTime.Now.Year;
            var result = from m in _context.Users where m.Rank != 2 select m.CreateOn;
            List<string> items = new List<string>();
            List<string> returnList = new List<string>();

            foreach (var item in result)
            {
                if(item.ToString("yyyy") == thisYear.ToString()){
                   items.Add(item.ToString("MM")); 
                }
                
            }
            Dictionary<string, int> counts = items.GroupBy(x => x)
                                                        .ToDictionary(g => g.Key,
                                                                        g => g.Count());

            for (int i = 1; i < 13; i++)
            {
                if (counts.ContainsKey(i.ToString("D2")))
                {
                    returnList.Add(counts[i.ToString("D2")].ToString());
                }else{
                    returnList.Add("0");
                }
                
            }


            return returnList;
        }
        public class countUsers{
            public int amount;
            public int rank;
        }
        [HttpGet("stats/users/vs/guest")]

        public IQueryable<countUsers> StatsGetAllUsersVSgest()
        {
            var thisYear = DateTime.Now.Year;
            var result = _context.Users.GroupBy(user => user.Rank)
            .Select(r => new countUsers
            {
                rank = r.Key,
                amount = r.Select(p => p.Id).Count()
            });



            return result;
        }

        [HttpGet("stats/sales/thisYear")]

        public List<string> GetStatsSalesThisYear()
        {
            var thisYear = DateTime.Now.Year;
            var result = from m in _context.ProductsSold select m;
            List<string> items = new List<string>();
            List<string> returnList = new List<string>();

            foreach (var item in result)
            {
                if (item.Date.ToString("yyyy") == thisYear.ToString())
                {
                    for (int i = 0; i < item.Amount; i++)
                    {
                        items.Add(item.Date.ToString("MM"));
                    } 
                }

            }
            Dictionary<string, int> counts = items.GroupBy(x => x)
                                                        .ToDictionary(g => g.Key,
                                                                        g => g.Count());
            
            for (int i = 1; i < 13; i++)
            {
                if (counts.ContainsKey(i.ToString("D2")))
                {
                    returnList.Add(counts[i.ToString("D2")].ToString());
                }
                else
                {
                    returnList.Add("0");
                }

            }

            return returnList;
        }

        public class BestSelling{
            public int id;
            public IQueryable<string> name;
            public int sold;
        }
        [HttpGet("stats/sales/thenBest")]
        public IQueryable<BestSelling> GetStatsThenBestThisYear()
        {
            var thisYear = DateTime.Now.Year;
            
            var result = _context.ProductsSold.GroupBy(item => item.ProductId)
            .Select(r => new BestSelling{
                id = r.Key,
                name = this.getNameOfProduct(r.Key),
                sold = r.Select(p => p.Amount).Sum()
            }).OrderByDescending(g => g.sold).Take(10);

            return result;
        }
        public IQueryable<string> getNameOfProduct(int id){
            var x = from m in _context.Products where m.Id == id select m.Name;
            return x;
        }
        public class ManOrWomanClass
        {
            public int id;
            public IQueryable<int> manOrWoman;
            public int sold;
        }
   
        [HttpGet("stats/overallSales/manOrWoman")]
        public IQueryable<ManOrWomanClass> StatsManOrWoman()
        {

            var result = _context.ProductsSold.GroupBy(item => item.ProductId)
            .Select(r => new ManOrWomanClass
            {
                id = r.Key,
                manOrWoman = this.getCatOfProduct(r.Key),
                sold = r.Select(p => p.Amount).Sum()
            }).OrderByDescending(g => g.sold);


            return result;
        }
        public IQueryable<int> getCatOfProduct(int id)
        {
            var x = from m in _context.ProductCategory where m.ProductId == id && (m.CategoryId == 1 || m.CategoryId == 2) select m.CategoryId;
            Console.WriteLine(x);
            return x;
        }

        public class categorieReturnClass{
            public int id;
            public IQueryable<IEnumerable<Category>> cat;
            public int sold;
        }

        [HttpGet("stats/overallSales/Categorie")]
        public IOrderedQueryable<categorieReturnClass> StatsCategorie()
        {

            var result = _context.ProductsSold.GroupBy(item => item.ProductId)
            .Select(r => new categorieReturnClass
            {
                id = r.Key,
                cat = this.getAllCatOfProduct(r.Key),
                sold = r.Select(p => p.Amount).Sum()
            }).OrderByDescending(g => g.sold);


            return result;
        }
        public IQueryable<IEnumerable<Category>> getAllCatOfProduct(int id)
        {
            var x = from m in _context.ProductCategory 
                    join cat in _context.Categories on m.CategoryId equals cat.Id into g
                    where m.ProductId == id && (m.CategoryId != 1 && m.CategoryId != 2) 
                    select g;

            Console.WriteLine(x);
            return x;
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
        [HttpGet("users/byid/{id}")]
        public IActionResult GetUserById(string id)
        {
            var user = _context.Users.FirstOrDefault (t => t.Id == Int32.Parse(id));
            if (user == null){
                return NotFound();
            }
            return new ObjectResult(user);
        }


        [HttpPost("new/Product")]
        public async Task<IActionResult> CreateNewProduct()  //deze functie haalt de wishlist data van de user
        {
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }

            dynamic p = JValue.Parse(this.RequestBody);
            var lastID = from q in _context.Products orderby -q.Id select q.Id;
            Product product = new Product(){
                Id = lastID.First() + 1,
                ImageName = p.imageName,
                Name = p.name,
                Price = p.price,
                Color = p.color,
                Amount = p.amount,
                Description = p.description,
                ProductSizeId = p.size,
            };
            _context.Products.Add(product);
            _context.SaveChanges();

            return Ok(product);
        }

        [HttpGet("cattegorie/all")]
        public IQueryable<Category> GetAllCattegories()
        {
            var result = from c in _context.Categories orderby c.Id select c;
            return result;
        }
        [HttpGet("sizes/all")]
        public IOrderedQueryable<ProductSize> GetAllSizes()
        {
            var result = from c in _context.ProductSizes orderby c.Id select c;
            return result;
        }
        private string RequestBody;
        
 

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
        [HttpPost("products/update/byid")]
        public async Task<IActionResult> UpdateProductById()  //deze functie haalt de wishlist data van de user
        {
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }
            dynamic up = JValue.Parse(this.RequestBody);
            int id = Int32.Parse(up.id.ToString());

            var products = _context.Products.Where(a => a.Id == id).Select(a => a).FirstOrDefault();
            products.ImageName = up.ImageName;
            products.Name = up.Name;
            products.Color = up.Color;
            products.Price = up.Price;
            products.Description = up.Description;

            _context.Products.Update(products);
            _context.SaveChanges();

            return Ok(products);
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
            user.Salt = user_edit.Salt;
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

                
        [HttpDelete("users/delete/all")]
        public IActionResult DeleteAllUsersAndAddresses()
        {
            var users = (from u in _context.Users select u).ToList();
            var addresses  = (from a in _context.Addresses select a).ToList();
            if(users == null){
                return NoContent();
            }
            if(addresses == null){
                return NoContent();
            }
            foreach(var user in users){
                _context.Users.Remove(user);
            }
             foreach(var address in addresses){
                _context.Addresses.Remove(address);
            }        
            _context.SaveChanges();

            return Ok();
        }

         // GET api/admin/order/userid
        [HttpGet("orders/{id}")]
        public IActionResult GetOrder(int id)
        {
            var order = _context.Orders.FirstOrDefault (t => t.UserId == id);
            if (order == null){
                return NotFound();
            }
            return new ObjectResult(order);
        }

         // POST api/admin/order/add
        [HttpPost("order/add")]
        public IActionResult AddOrder([FromBody]Order order)
        {
            if(order == null){
                return NoContent();
            }
            _context.Orders.Add(order);
            // _context.Addresses.Add(user_address)
            _context.SaveChanges();
            return Ok();

        }

         // GET api/admin/productsold/all
        [HttpGet("productssold/all")]
        public IQueryable<ProductSold> GetAllSoldProducts()
        {
            var result = from m in _context.ProductsSold select m;
            return result;
        }


         // POST api/admin/productsold/solditem
        [HttpPost("productsold/solditem")]
        public IActionResult AddToProductSold([FromBody]ProductSold sold_item)
        {
            if(sold_item == null){
                return NoContent();
            }
            _context.ProductsSold.Add(sold_item);
            _context.SaveChanges();
            return Ok();

        }
            
    }
}
