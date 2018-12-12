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
using backend.Pagination;
using backend.Services;



namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        FashionContext _context;
        public ProductController(FashionContext context){

            _context = context;
        }
        // Typed lambda expression for Select() method.     ///For turning a Product into a ProductDTO For the Catalogus
        private static readonly Expression<Func<Product, ProductDto>> AsProductDto = 
            x => new ProductDto
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                ImageName = x.ImageName,
                Amount = x.Amount
            };

             // GET api/product/all
        [HttpGet()]
        public IQueryable<ProductDto> GetProducts()  // for Catalogus NOT paged
        {
            return _context.Products
            .Select(AsProductDto);

        }

        [HttpGet("search/{searchterm=string}")]
        public IQueryable<ProductDto> GetProductsBySearchterm(string searchterm)  // for Catalogus NOT paged
        {
            var lowercased_searchterm = searchterm.ToLower();
            var result = _context.Products.Where(p => p.Name.ToLower().Contains(lowercased_searchterm)).Select(AsProductDto);
  
            return result;
        }
         [HttpGet("~/api/filter/{categories}")]
         public IQueryable GetProductByCategoryCol(ICollection<string> categories){

             ICollection<string> list_cat_param = categories;
             var result =  _context.Products.Select(m=>m);
             if(list_cat_param.Count == 1){
                 
             }else if(list_cat_param.Count >= 1){
                //  foreach(string cat in list_cat_param){
                //      result = _context.Products.Intersect()
                //  }
             }

             return result;
         }

        [HttpGet("~/api/categories/{category=string}")]
        public IQueryable GetProductByCategory(string category)  /// Get products by category Heren | Dames
        {
            char[] subset = category.ToCharArray(); /// string 'heren' omzetten naar 'Heren' of 'dames' naar 'Dames'
            subset[0] = Char.ToUpper(subset[0]);
            string cat = new string(subset);
            System.Console.WriteLine(cat + " category");  // Even de string testen

            var Result = (
                    from p in _context.Products 
                    from pc in _context.ProductCategory
                    let partial = (   //parent category
                        from c in _context.Categories
                        from pc in _context.ProductCategory                        
                        where c.Id == pc.CategoryId where c.Name == @cat /// Category gelijk aan 
                        select c).FirstOrDefault()
                    where p.Id == pc.ProductId
                    where pc.CategoryId == partial.Id
                    orderby p.Id

                    select new 
                {
                    Id = p.Id,
                    Name = p.Name,
                    ImageName = p.ImageName,
                    Price = p.Price,
                    Amount = p.Amount,
                    CategoryName = partial.Name
                });

            return Result;   
        }

        [HttpGet("~/api/PayEmail/{email=string}/{price=string}")]
        public void SendEmail(string email,string price)  /// Get products by category Heren | Dames
        {

            backend.Services.MailService MailService = new backend.Services.MailService();
            MailService.email = email;
            MailService.setCustomMessage("Aankoop HR Fashion!", "Bedankt voor uw aankoop bij HR Fashion.\n Wij hebben het totaal bedrag van " + price + " euro ontvangen en versturen uw producten binnen 1 werkdag. \n met vriendelijke groeten HR Fashion");
            MailService.sendEmail();
        }

        [HttpGet("~/api/categories/{category=string}/{searchterm=string}")]
        public IQueryable GetProductByCategoryAndID(string category, string searchterm)  /// Get products by category Heren | Dames
        {
            var lowercased_searchterm = searchterm.ToLower();
            char[] subset = category.ToCharArray(); /// string 'heren' omzetten naar 'Heren' of 'dames' naar 'Dames'
            subset[0] = Char.ToUpper(subset[0]);
            string cat = new string(subset);
            System.Console.WriteLine(cat + " category");  // Even de string testen

            var Result = (
                    from p in _context.Products 
                    from pc in _context.ProductCategory
                    let partial = (   //parent category
                        from c in _context.Categories
                        from pc in _context.ProductCategory                        
                        where c.Id == pc.CategoryId where c.Name == @cat /// Category gelijk aan 
                        select c).FirstOrDefault()
                    where p.Id == pc.ProductId
                    where pc.CategoryId == partial.Id
                    orderby p.Id

                    select new 
                {
                    Id = p.Id,
                    Name = p.Name,
                    ImageName = p.ImageName,
                    Price = p.Price,
                    Amount = p.Amount,
                    CategoryName = partial.Name
                });
                var result2 = Result.Where(p => p.Name.ToLower().Contains(lowercased_searchterm));

            return result2;   
        }


        private string RequestBody;
        [HttpPost]
        [Route("~/api/products-by/array")]

        public async Task<IQueryable> ReadStringDataManual()
        {
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }
            dynamic productIds = JValue.Parse(this.RequestBody);

            //System.Console.WriteLine(derp);
            //return productIds.items[0];

            return this.handleBodyPost(productIds.items);
        }

        private IQueryable handleBodyPost(dynamic array)
        {
            List<string> ItemsList = new List<string>();
            foreach (var item in array)
            {
                ItemsList.Add(item.ToString());
            }

            var result = (from p in _context.Products
                          where ItemsList.Contains(Convert.ToString(p.Id))
                          select new
                          {
                              Id = p.Id,
                              Name = p.Name,
                              ImageName = p.ImageName,
                              Price = p.Price,
                              Amount = p.Amount,
                          });
            return (result);

        }

        // [HttpGet("~/api/categories/{category}/{category2}")]
        // public IQueryable GetProductByCategories(string category, string category2)  /// Get products by category Heren | Dames
        // {
        //     char[] subset = category.ToCharArray(); /// string 'heren' omzetten naar 'Heren' of 'dames' naar 'Dames'
        //     subset[0] = Char.ToUpper(subset[0]);
        //     string cat = new string(subset);
        //     System.Console.WriteLine(cat + " category");  // Even de string testen

        //     char[] subset2 = category2.ToCharArray(); /// string 'heren' omzetten naar 'Heren' of 'dames' naar 'Dames'
        //     subset2[0] = Char.ToUpper(subset2[0]);
        //     string cat2 = new string(subset2);
        //     System.Console.WriteLine(cat2 + " subcategory");  // Even de string testen

        //      var Result = 
        //             from p in _context.Products select p;
        //     var Result = (
        //         from pc in _context.ProductCategory
        //         let hfl = (
        //             from p in _context.Products 
        //             from pc2 in _context.ProductCategory
        //             let partial = (   //parent category
        //                 from c in _context.Categories
        //                 from pc3 in _context.ProductCategory                        
        //                 where c.Id == pc3.CategoryId where c.Name == cat /// Category gelijk aan 
        //                 select c)
        //             where p.Id == pc2.ProductId
        //             where pc2.CategoryId == partial.Id             
        //             select p)
        //         let partial = (
        //             from c in _context.Categories
        //             from pc in _context.ProductCategory                        
        //             where c.Id == pc.CategoryId where c.Name == cat2 /// Category gelijk aan 
        //             select c)

        //         where hfl.Id == pc.ProductId
        //         where pc.CategoryId == partial.Id
        //         orderby hfl.Id               
        //         select hfl
        //         );
        // return Result;
        // }
        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
            base.Dispose(disposing);
        }
        [HttpGet("{id}/details")]
        public async Task<IActionResult> GetProductDetail(int id)    ///To get specific information about products
        {
            var product = await (from p in _context.Products
            where p.Id == id
            select new ProductDetailDto
                {
                    Name = p.Name,
                    ImageName = p.ImageName,
                    Description = p.Description,
                    Color = p.Color,
                    SizeName = p.ProductSize.SizeName,
                    Price = p.Price,
                    Amount = p.Amount
                }).FirstOrDefaultAsync();

            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }  

         //Products/paged/0/3
        [HttpGet ("paged/{index_page}/{page_size}")]

        public IActionResult GetProductsPaged(int index_page,int page_size)
        {
            var result = _context.Products.GetPages(index_page,page_size,m => m.Id);
            return new OkObjectResult(result);
        }
    }
}
