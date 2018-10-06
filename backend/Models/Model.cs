using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System;

namespace backend.Models
{
public class FashionContext : DbContext
    {

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductSize> ProductSizes { get; set; }       
        public DbSet<ProductCategory> ProductCategory { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Discount> Discounts { get; set; }   
        public DbSet<ProductSold> ProductsSold { get; set; }
        public DbSet<Order> Orders { get; set; } 
        public DbSet<User> Users { get; set; }
        public DbSet<Status> Statuses { get; set; } 
        public DbSet<WishListProduct> WishListProducts { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Country> Countries { get; set; }

        public FashionContext(DbContextOptions<FashionContext> options): base(options)
        {        
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductCategory>()
            .HasKey(t => new { t.Id });
            modelBuilder.Entity<ProductCategory>()
            .HasOne<Product>(ma => ma.Product)
            .WithMany(m => m.Categories)
            .HasForeignKey(ma => ma.ProductId);
            modelBuilder.Entity<ProductCategory>()
            .HasOne<Category>(ma => ma.Category)
            .WithMany(m => m.Products)
            .HasForeignKey(ma => ma.CategoryId);
 
            modelBuilder.Entity<Product>().HasData(new Product{Id = 1, Name = "Harajuku Pink Dress", 
            Description = "Very Beautiful Japanese Style Dress in color Pink", Color = "Pink", 
            Price = 39.99M, ProductSizeId = 2, Amount = 5, ImageName="Pink-Harajuku-Dress.jpg"  });

            modelBuilder.Entity<Product>().HasData(new Product{Id = 2, Name = "Black Gentleman Shoes", 
            Description = "Gentleman Shoes for real Gentleman", Color = "Black", 
            Price = 79.99M, ProductSizeId = 20, Amount = 2, ImageName="Gentleman-Shoes.jpg"});

            modelBuilder.Entity<ProductSize>().HasData(
            new {Id = 1, SizeName= "XS" },
            new {Id = 2, SizeName= "S" },
            new {Id = 3, SizeName = "M"},
            new {Id = 4, SizeName = "L"},
            new {Id = 5, SizeName = "XL"}, 
            new {Id = 6, SizeName = "XXL"} ,
            new {Id = 7, SizeName = "34"} ,
            new {Id = 8, SizeName = "35"} ,
            new {Id = 9, SizeName = "36"} ,
            new {Id = 10, SizeName = "37"} ,
            new {Id = 11, SizeName = "38"} , 
            new {Id = 12, SizeName = "39"} ,
            new {Id = 13, SizeName = "40"} ,
            new {Id = 14, SizeName = "41"} ,
            new {Id = 15, SizeName = "42"} ,
            new {Id = 16, SizeName = "43"} ,
            new {Id = 17, SizeName = "44"} ,
            new {Id = 18, SizeName = "45"} ,
            new {Id = 19, SizeName = "46"} ,
            new {Id = 20, SizeName = "47"} ,
            new {Id = 21, SizeName = "48"} ,
            new {Id = 22, SizeName = "49"} );
        }
    }
}


    