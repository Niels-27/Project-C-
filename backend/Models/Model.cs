using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System;

namespace backend.Models
{
public class FashionContext : DbContext  //De database
    {

        public DbSet<Product> Products { get; set; }  //Alle tabellen in de database
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
            modelBuilder.Entity<ProductCategory>()  // Relation Many-To-Many: product to product-category and category to product-category
            .HasKey(t => new { t.Id });  //Primary Key

            modelBuilder.Entity<ProductCategory>()   //Van Product naar Productcategory
            .HasOne<Product>(ma => ma.Product)
            .WithMany(m => m.Categories)   //One product has many categories
            .HasForeignKey(ma => ma.ProductId);

            modelBuilder.Entity<ProductCategory>() //Van Category naar Productcategory
            .HasOne<Category>(ma => ma.Category)
            .WithMany(m => m.Products)   //One Category has many Products
            .HasForeignKey(ma => ma.CategoryId);

            modelBuilder.Entity<ProductSold>()
            .HasIndex(p => new { p.ProductId })
            .IsUnique(false);

            //Shout out

   


                );

            modelBuilder.Entity<ProductSize>().HasData(    // Initial Data for ProductSizes Tabel
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

            modelBuilder.Entity<Category>().HasData(   // Initial Data for Category Tabel
                new{Id = 1, Name = "Dames"},
                new{Id = 2, Name = "Heren"},
                new{Id = 3, Name = "Schoenen"},
                new{Id = 4, Name = "Shirts"},
                new{Id = 5, Name = "Jeans"},
                new{Id = 6, Name = "Hoodies"},
                new{Id = 7, Name = "Vesten"},
                new{Id = 8, Name = "Adidas"},
                new{Id = 9, Name = "Nike"},
                new{Id = 10, Name = "HRFashion"},
                new{Id = 11, Name = "Puma"},
                new{Id = 12, Name = "Timberland"},
                new{Id = 13, Name = "Reebok"},
                new{Id = 14, Name = "Vans"}
            );

            modelBuilder.Entity<Country>().HasData(new{Id = 1, Name = "Nederland"});  // Initial Data for Country Tabel

            modelBuilder.Entity<Status>().HasData(     // Initial Data for Status Tabel
                new{Id = 1, Name = "Review", Description = "The transaction has been marked for review, typically by the payment gateway."},
                new{Id = 2, Name = "Purchase Order", Description = "The the purchase order for the transaction has been created." + 
                 "This status is set at the very onset of the transaction, typically before the invoiced balance is set, and before the payment" +
                "is authorized or paid."},
                new{Id = 3, Name = "Invoiced", Description = "The transaction is invoiced, and the order total becomes an open balance."},
                new{Id = 4, Name = "Authorized", Description = "The payment for the transaction has been authorized by the payment gateway."},
                new{Id = 5, Name = "Paid", Description = "The payment for the transaction has been accepted by the payment gateway."},
                new{Id = 6, Name = "Shipped", Description = "The order has been marked as shipped by the merchant."},
                new{Id = 7, Name = "Refunded", Description = "The payment for the transaction has been refunded."},
                new{Id = 8, Name = "Voided", Description = "The balance on the transaction has been voided."},
                new{Id = 9, Name = "Delivered", Description = "The order is delivered to the client."}
                );
                
             // Add Admin account | Rank 1 = user, 2 = normale user, 3 = mod, 4 = admin|
            // Username:Password => admin:welkom01
            modelBuilder.Entity<User>().HasData(
                new User{Id = 1, Name = "admin", Email = "admin@hrfashion.nl", Salt = "Ukp7BqmIS61j+hZQ0BowmIKycaQ=" , Key = "smcJ/dBZATN4Mn117ExHtUwi6xA=", CreateOn = DateTime.Now, Rank = 4 }
            );

        }
    }
}


    
