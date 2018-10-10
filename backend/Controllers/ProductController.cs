using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Web;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using backend.Models;
using backend.DTOs;
using Npgsql;

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
        [HttpGet("all")]
        public IQueryable<ProductDto> GetProducts()  // for Catalogus NOT paged
        {
            return _context.Products
            .Select(AsProductDto);

        }

        // GET api/Books/5
        [HttpGet("{id=int}")]
        public async Task<IActionResult> GetProduct(int id)   // For Catalogus by id Not Paged
        {
            ProductDto product = await _context.Products
                .Where(b => b.Id == id)
                .Select(AsProductDto)
                .FirstOrDefaultAsync();
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
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
                    Name = p.Name,
                    ImageName = p.ImageName,
                    Price = p.Price,
                    Amount = p.Amount,
                    CategoryName = partial.Name
                });

            return Result;   
        }

        [HttpGet("~/api/categories/{category}/{category2}")]
        public IQueryable GetProductByCategories(string category, string category2)  /// Get products by category Heren | Dames
        {
            char[] subset = category.ToCharArray(); /// string 'heren' omzetten naar 'Heren' of 'dames' naar 'Dames'
            subset[0] = Char.ToUpper(subset[0]);
            string cat = new string(subset);
            System.Console.WriteLine(cat + " category");  // Even de string testen

            char[] subset2 = category2.ToCharArray(); /// string 'heren' omzetten naar 'Heren' of 'dames' naar 'Dames'
            subset2[0] = Char.ToUpper(subset2[0]);
            string cat2 = new string(subset2);
            System.Console.WriteLine(cat2 + " subcategory");  // Even de string testen
            
             var Result = 
                    from p in _context.Products select p;
            // var Result = (
            //     from pc in _context.ProductCategory
            //     let hfl = (
            //         from p in _context.Products 
            //         from pc2 in _context.ProductCategory
            //         let partial = (   //parent category
            //             from c in _context.Categories
            //             from pc3 in _context.ProductCategory                        
            //             where c.Id == pc3.CategoryId where c.Name == cat /// Category gelijk aan 
            //             select c)
            //         where p.Id == pc2.ProductId
            //         where pc2.CategoryId == partial.Id             
            //         select p)
            //     let partial = (
            //         from c in _context.Categories
            //         from pc in _context.ProductCategory                        
            //         where c.Id == pc.CategoryId where c.Name == cat2 /// Category gelijk aan 
            //         select c)

            //     where hfl.Id == pc.ProductId
            //     where pc.CategoryId == partial.Id
            //     orderby hfl.Id               
            //     select hfl
            //     );
        return Result;
        }
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

            //     [HttpGet("all/{image}")]
            // public ActionResult Image(string id)
            // {
            //     var dir = Server.MapPath("/Images");
            //     var path = Path.Combine(dir, id + ".jpg"); //validate the path for security or use other means to generate the path.
            //     return base.File(path, "image/jpeg");
            // }

        
    }
}
