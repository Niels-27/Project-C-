using backend.Models;
using backend.DTOs;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Web;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;


namespace backend.FilterHelper{
    public class NewType{
         public int Id {get;set;}
         public string Name {get;set;} 
         public string ImageName {get;set;} 
         public decimal Price {get;set;} 
         public int Amount {get;set;} 
         public string CategoryName {get;set;}  
    }
    
        public static class CatQueries
        {
            
        // private static readonly Expression<Func<Product, NewType>> AsNewType = 
        //     x => new NewType
        //     {
        //         Id = x.Id,
        //         Name = x.Name,
        //         ImageName = x.ImageName,
        //         Price = x.Price,       
        //         Amount = x.Amount,
        //         CategoryName = x.Categories.Join(  pc=> pc.ProductId == x.Id).
        //     };
        //     public IEnumerable<NewType> GetProductEnumerable(FashionContext _context, string cat){
        //         var Result = (
        //             from p in _context.Products 
        //             from pc in _context.ProductCategory
        //             let partial = (   //parent category
        //                 from c in _context.Categories
        //                 from pc in _context.ProductCategory                        
        //                 where c.Id == pc.CategoryId where c.Name == @cat /// Category gelijk aan 
        //                 select c).FirstOrDefault()
        //             where p.Id == pc.ProductId
        //             where pc.CategoryId == partial.Id
        //             orderby p.Id

        //             select(NewType)).AsEnumerable();

        //         return Result;

        //     }
        }
    public class ProductBusinessLogic
    {
        FashionContext _context;
        public ProductBusinessLogic(FashionContext context)
        {
        _context = context;
        }

        public IQueryable<Product> GetProducts(ProductFilterModel filterModel)
        {
            var result = _context.Products.AsQueryable();
            if (filterModel != null)
            {
                if (!string.IsNullOrEmpty(filterModel.Color))
                     result = result.Where(x => x.Color.Contains(filterModel.Color));
                if (filterModel.PriceFrom.HasValue)
                    result = result.Where(x => x.Price >= filterModel.PriceFrom);
                if (filterModel.PriceTo.HasValue)
                    result = result.Where(x => x.Price <= filterModel.PriceTo);
            }
            return result;   
        }
    }
    
}