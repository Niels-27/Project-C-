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
        [Route("post")]

        public async Task<IActionResult> ReadStringDataManual()
        {
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }
            dynamic order = JValue.Parse(this.RequestBody);  //order object
            return this.handleBodyPost(order);
        }
        private IActionResult handleBodyPost(dynamic order)
        {
            System.Console.WriteLine(order);
            //front-end stuurt naar de backend, meerdere elementen in een array, bestaande uit producten van een order
            //elk product uit een order-array vanuit de frontend heeft de bijbehorende userId, ProductId, addressId amount, 
            // { userId : 1,
            //   addressId : 1,   
            //   orderProducts: {
            //     product1: {id: 1 ...
            //     product2: {id:3 ...
            //     product3:{id:9, ....
            //   }
            // }     

            Dictionary<string, int> amountDict = new Dictionary<string, int>();
            List<string> cookieList = new List<string>();
            foreach (var item in order.cookie.items) {
                cookieList.Add(item.ToString());
            }
            foreach (var item in cookieList) {
                if (!amountDict.ContainsKey(item)) { amountDict[item] = 1; }
                else { amountDict[item]++; }
            }

            int userId = order.userId;
            int addressId = order.addressId;
            User user_select = _context.Users.Where(u => u.Id == userId).Select(u => u).FirstOrDefault();
            Address address_select = _context.Addresses.Where(a => a.Id == addressId).Select(a => a).FirstOrDefault();
            DateTime createDate = DateTime.UtcNow;
            Status status_select = _context.Statuses.Where(s => s.Id == 5).Select(s => s).FirstOrDefault();
            Order new_order = new Order()
                        {
                            User = user_select,
                            Status = status_select,
                            Address = address_select,
                        };
            _context.Orders.Add(new_order);          

            foreach (dynamic productSold in order.orderProducts) {

                int productId = productSold.id;  // pakt productId
                int productIdFreq = amountDict[productId.ToString()];
                Product product_select = _context.Products.Where(product => product.Id == productId).Select(p => p).FirstOrDefault();
                product_select.Amount = product_select.Amount - productIdFreq;  /// Trekt freq af van stocks 

                ProductSold new_productSold = new ProductSold(){
                    Amount = productIdFreq,
                    Product = product_select,
                    User = user_select,
                    Order = new_order,
                    Date = createDate,
                };
                _context.ProductsSold.Add(new_productSold);
                _context.Products.Update(product_select);
                // _context.SaveChanges(); 
                Console.WriteLine("Dit is de amount van productssold:" + new_productSold.Amount);
                Console.WriteLine("Dit is de amount van de stock van product:" + product_select.Amount);

            }
            _context.SaveChanges();

            // return (new_order);

            return Ok(new_order);
        }
    }
}