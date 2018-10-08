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
            modelBuilder.Entity<ProductCategory>()  // Relation Many-To-Many: product to product-category and category to product-category
            .HasKey(t => new { t.Id });
            modelBuilder.Entity<ProductCategory>()
            .HasOne<Product>(ma => ma.Product)
            .WithMany(m => m.Categories)
            .HasForeignKey(ma => ma.ProductId);
            modelBuilder.Entity<ProductCategory>()
            .HasOne<Category>(ma => ma.Category)
            .WithMany(m => m.Products)
            .HasForeignKey(ma => ma.CategoryId);

            // Initial Data for Products Tabel (10 products for test)
            modelBuilder.Entity<Product>().HasData(new Product{Id = 1, Name = "Zwarte Sweat Shirt",    //#1
            Description = "Coole zwarte sweatshirt voor heren.", Color = "Zwart", 
            Price = 39.99M, ProductSizeId = 3, Amount = 20, ImageName="Black-History-Sweat-Shirt.jpg"  });

            modelBuilder.Entity<Product>().HasData(new Product{Id = 2, Name = "Zwarte Schoenen",  //#2
            Description = "Gentleman schoenen voor echte heren", Color = "Zwart", 
            Price = 19.99M, ProductSizeId = 17, Amount = 20, ImageName="Gentleman-Shoes.jpg"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 3, Name = "Adidas Swag Shirt",  //#3
            Description = "Super coole Adidas swag shirt.", Color = "Zwart", 
            Price = 24.99M, ProductSizeId = 3, Amount = 20, ImageName="Cool-Black-Tshirt.jpg"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 4, Name = "Koreaanse Jeans",  //#4
            Description = "Stoere Koreaanse Jeans van denim voor heren.", Color = "Blauw", 
            Price = 49.99M, ProductSizeId = 3, Amount = 20, ImageName="Korean-Jeans.jpg"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 5, Name = "Zwarte Vest",   //#5
            Description = "Super coole zwarte vest voor echte swaggers.", Color = "Black", 
            Price = 79.99M, ProductSizeId = 4, Amount = 20, ImageName="Grafische-Sweat-Shirt.jpg"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 6, Name = "Sexy Vrouwen Jeans",   //#6
            Description = "Sexy strakke jeans voor vrouwen met scheuren.", Color = "Blauw", 
            Price = 29.99M, ProductSizeId = 2, Amount = 20, ImageName="Sexy-Woman-Jeans-Denim-Blue.jpg"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 7, Name = "Rode Swag Hoodie",  //#7
            Description = "Thug Life rode swag hoodie voor jongens. Word een beest in deze hoodie!", Color = "Rood", 
            Price = 45.99M, ProductSizeId = 5, Amount = 20, ImageName="Swag-Hoodie-Red.jpg"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 8, Name = "Witte Adidas Schoen",  //#8
            Description = "Witte Swag Adidas schoenen voor heren. Boost je Imago en wordt de baddest" +
            " boy in je omgeving met deze schoenen. ", Color = "Wit", 
            Price = 17.99M, ProductSizeId = 19, Amount = 20, ImageName="White-Shoe-Adidas.jpg"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 9, Name = "Zwarte Swag Boots",  //#9
            Description = "Swag Boots voor stoere vrouwen. Word de baddest chick in town.", Color = "Zwart", 
            Price = 39.99M, ProductSizeId = 10, Amount = 20, ImageName="Swag-Boot-Black-Shoes.jpg"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 10, Name = "Geel Shirt",  //#10
            Description = "Geel shirt voor heren. Opvallende kleur zodat iedereen je ziet staan.", Color = "Geel", 
            Price = 14.99M, ProductSizeId = 2, Amount = 20, ImageName="Yellow-shirt.jpg"});

            modelBuilder.Entity<ProductCategory>().HasData(
                new {Id = 1, ProductId = 1, CategoryId = 2},
                new {Id = 2, ProductId = 1, CategoryId = 4},

                new {Id = 3, ProductId = 2, CategoryId = 2},
                new {Id = 4, ProductId = 2, CategoryId = 3},

                new {Id = 5, ProductId = 3, CategoryId = 2},
                new {Id = 6, ProductId = 3, CategoryId = 4},

                new {Id = 7, ProductId = 4, CategoryId = 2},
                new {Id = 8, ProductId = 4, CategoryId = 5},

                new {Id = 9, ProductId = 5, CategoryId = 2},
                new {Id = 10, ProductId = 5, CategoryId = 7},

                new {Id = 11, ProductId = 6, CategoryId = 1},  //dames   
                new {Id = 12, ProductId = 6, CategoryId = 5},  //jeans

                new {Id = 13, ProductId = 7, CategoryId = 2},
                new {Id = 14, ProductId = 7, CategoryId = 6},

                new {Id = 15, ProductId = 8, CategoryId = 2},
                new {Id = 16, ProductId = 8, CategoryId = 3},

                new {Id = 17, ProductId = 9, CategoryId = 1},
                new {Id = 18, ProductId = 9, CategoryId = 3},

                new {Id = 19, ProductId = 10, CategoryId = 2},
                new {Id = 20, ProductId = 10, CategoryId = 4}
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
                new {Id = 5, Name = "Jeans"},
                new{Id = 6, Name = "Hoodies"},
                new{Id = 7, Name = "Vesten"}
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
                new{Id = 8, Name = "Voided", Description = "The balance on the transaction has been voided."}
                );

        }
    }
}


    