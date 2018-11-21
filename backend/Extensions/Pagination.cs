using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;


namespace backend.Pagination
{
    public class Page<T>{
        public int index{get;set;}
        public T[] Items{get; set;}
        public int TotalPages {get; set;}
    }
    
    
    public static class MyExtension{
        public static Page<T> GetPages<T>(this Microsoft.EntityFrameworkCore.DbSet<T> list, int index_page, int page_size, Func<T, object> order_by_selector) where T:class{
            var result = list.OrderBy(order_by_selector)
            //index = 1; page_size = 3 , skip pages = 3*1 =3
            .Skip(index_page*page_size)
            .Take(page_size)
            .ToArray();

            var total_items = list.Count();
            var total_pages = total_items / page_size;
            return new Page<T>{
                index = index_page,
                Items = result,
                TotalPages = total_pages
            };

        }


    }
}