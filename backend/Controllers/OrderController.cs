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
    public class OrderController : Controller
    {
        FashionContext _context;
        public OrderController(FashionContext context)
        {

            _context = context;
        }


         private string RequestBody;
        [HttpPost]
        [Route("~/api/orders-by/")]

        public async Task<IQueryable> ReadStringDataManual()
        {
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }
            dynamic orders = JValue.Parse(this.RequestBody);
            return this.handleBodyPost(orders.items);
        }

        // private IQueryable handleBodyPost(dynamic array)
        // {
        //     List<string> ItemsList = new List<string>();
        //     foreach (var item in array)
        //     {
        //         ItemsList.Add(item.ToString());
        //     }

        //     var result = (from o in _context.Orders
        //                   where ItemsList.Contains(Convert.ToString(o.Id))
                          
        //                   select new
        //                   {
        //                       Id = o.Id,
        //                       UserId = o.UserId,
        //                       StatusId = o.StatusId,
        //                       AddressId = o.AddressId,
                              
                              
        //                   });
        //     _context.Add(result);
        //     _context.SaveChanges();              
        //     return (result);

        // }

        private Order handleBodyPost(dynamic orders)
        {

            System.Console.WriteLine(orders);
           

           Order new_order = new Order()
                          {
                              Id = orders.Id,
                              UserId = orders.UserId,
                              StatusId = orders.StatusId,
                              AddressId = orders.AddressId,
                        };
            _context.Orders.Add(new_order);
            _context.SaveChanges();      

            foreach (dynamic productSold in orders.productSold) {
                ProductSold new_productSold = new ProductSold();
                new_productSold.Amount = productSold.Amount;
                new_productSold.Id = productSold.Id;
                new_productSold.ProductId = productSold.ProductId;
                new_productSold.Product = productSold.Product;
                new_productSold.UserId = productSold.UserId;
                new_productSold.OrderId = productSold.OrderId;

                _context.ProductsSold.Add(new_productSold);
                // _context.SaveChanges();

                Product product_select = _context.Products.Where(product => product.Id == new_productSold.ProductId).FirstOrDefault();
                product_select.Amount = product_select.Amount - 1;
                _context.Products.Update(product_select);
                _context.SaveChanges();
            }

            // return (new_order);

            return null;

           
            

        }



    }
}            