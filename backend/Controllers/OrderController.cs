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
        [Route("~/api/postOrder/")]

        public async Task<IQueryable> ReadStringDataManual()
        {
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                this.RequestBody = await reader.ReadToEndAsync();
            }
            dynamic orderProducts = JValue.Parse(this.RequestBody);
            return this.handleBodyPost(orderProducts);
        }
        private Order handleBodyPost(dynamic products)
        {

            System.Console.WriteLine(products);

            //front-end stuurt naar de backend, meerdere elementen in een array, bestaande uit producten van een order
            //elk product uit een order-array vanuit de frontend heeft de bijbehorende userId, ProductId, addressId amount, 
            // { userId : 1,
            //   addressId : 1,   
            //   productOrders: {
            //     product1: {id: 1, amount: 7}
            //     product2: {id:3, amount: 1}
            //     product3:{id:9, amount: 4}
            //   }
            // }
           Order new_order = new Order()
                          {
                              UserId = products.userId,
                              StatusId = 5,
                              AddressId = products.addressId,
                        };
            _context.Orders.Add(new_order);
            _context.SaveChanges();      

            foreach (dynamic productSold in products.productOrders) {
                ProductSold new_productSold = new ProductSold();
                new_productSold.Amount = productSold.amount;
                new_productSold.ProductId = productSold.id;
                new_productSold.UserId = products.userId;
                new_productSold.OrderId = new_order.Id;

                _context.ProductsSold.Add(new_productSold);
                // _context.SaveChanges();

                Product product_select = _context.Products.Where(product => product.Id == new_productSold.ProductId).FirstOrDefault();
                product_select.Amount = product_select.Amount - new_productSold.Amount;
                _context.Products.Update(product_select);
                
            }
            _context.SaveChanges();

            // return (new_order);

            return null;

           
            

        }



    }
}            