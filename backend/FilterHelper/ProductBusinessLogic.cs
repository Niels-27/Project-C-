using backend.Models;
using backend.DTOs;
using System.Linq;
using System;


namespace backend.FilterHelper{
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