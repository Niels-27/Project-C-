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

            // Initial Data for Products Tabel (10 products for test)
            modelBuilder.Entity<Product>().HasData(new Product{Id = 1, Name = "Zwarte Sweat Shirt",    //#1
            Description = "Coole zwarte sweatshirt voor heren.", Color = "Zwart", 
            Price = 39.99M, ProductSizeId = 3, Amount = 20, ImageName="https://img.represent.com/uploads/c316464e3c69408be954c6d05edd10a9.jpg?auto=format&w=750"  });

            modelBuilder.Entity<Product>().HasData(new Product{Id = 2, Name = "Zwarte Schoenen",  //#2
            Description = "Gentleman schoenen voor echte heren", Color = "Zwart", 
            Price = 19.99M, ProductSizeId = 17, Amount = 20, ImageName="https://assets.adidas.com/images/w_600,f_auto,q_auto/ab12ced1d0a14151b88ea7fa00ee94a1_9366/Superstar_Foundation_Shoes_Black_B27140_01_standard.jpg"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 3, Name = "Adidas Swag Shirt",  //#3
            Description = "Super coole Adidas swag shirt.", Color = "Zwart", 
            Price = 24.99M, ProductSizeId = 3, Amount = 20, ImageName="https://kickz.akamaized.net/en/media/images/p/600/adidas-CLFN_T_Shirt-BLACK_MEDIUM_GREY_HEATHER_WHITE-1.jpg"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 4, Name = "Koreaanse Jeans",  //#4
            Description = "Stoere Koreaanse Jeans van denim voor heren.", Color = "Blauw", 
            Price = 49.99M, ProductSizeId = 3, Amount = 20, ImageName="https://www.local-outerwear.eu/wp-content/uploads/2015/11/W16-902BJ-Dawn_Front.jpg"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 5, Name = "Zwarte Vest",   //#5
            Description = "Super coole zwarte vest voor echte swaggers.", Color = "Black", 
            Price = 79.99M, ProductSizeId = 4, Amount = 20, ImageName="https://images.esellerpro.com/2294/I/111/28/lrgscaleNH45BLACK_NEW.jpg"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 6, Name = "Sexy Vrouwen Jeans",   //#6
            Description = "Sexy strakke jeans voor vrouwen met scheuren.", Color = "Blauw", 
            Price = 29.99M, ProductSizeId = 2, Amount = 20, ImageName="https://images-na.ssl-images-amazon.com/images/I/71lO9goTlGL._UY445_.jpg"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 7, Name = "Rode Swag Hoodie",  //#7
            Description = "Thug Life rode swag hoodie voor jongens. Word een beest in deze hoodie!", Color = "Rood", 
            Price = 45.99M, ProductSizeId = 5, Amount = 20, ImageName="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmSJ2f1znHd7v7lL18PLNS3A7dL_UQeuqU6NmiyscbY1NFRqpvJA"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 8, Name = "Witte Adidas Schoen",  //#8
            Description = "Witte Swag Adidas schoenen voor heren. Boost je Imago en wordt de baddest" +
            " boy in je omgeving met deze schoenen. ", Color = "Wit", 
            Price = 17.99M, ProductSizeId = 19, Amount = 20, ImageName="https://dtpmhvbsmffsz.cloudfront.net/posts/2017/09/13/59b958a17f0a053a7b03e25f/m_59b958b8713fde7bfd03fda2.jpg"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 9, Name = "Zwarte Swag Boots",  //#9
            Description = "Swag Boots voor stoere vrouwen. Word de baddest chick in town.", Color = "Zwart", 
            Price = 39.99M, ProductSizeId = 10, Amount = 20, ImageName="https://images.timberland.com/is/image/timberland/10073009-HERO?$PDP-FULL-IMAGE$"});

            modelBuilder.Entity<Product>().HasData(new Product{Id = 10, Name = "Geel Shirt",  //#10
            Description = "Geel shirt voor heren. Opvallende kleur zodat iedereen je ziet staan.", Color = "Geel", 
            Price = 14.99M, ProductSizeId = 2, Amount = 20, ImageName="https://scene7.zumiez.com/is/image/zumiez/pdp_hero/DOPE-Global-Yellow-T-Shirt-_297867-front-US.jpg"});

            modelBuilder.Entity<ProductCategory>().HasData(
                new {Id = 1, ProductId = 1, CategoryId = 2},
                new {Id = 2, ProductId = 1, CategoryId = 4},
                new {Id = 3, ProductId = 1, CategoryId = 10},

                new {Id = 4, ProductId = 2, CategoryId = 2},
                new {Id = 5, ProductId = 2, CategoryId = 3},
                new {Id = 6, ProductId = 2, CategoryId = 10},

                new {Id = 7, ProductId = 3, CategoryId = 2},
                new {Id = 8, ProductId = 3, CategoryId = 4},
                new {Id = 9, ProductId = 3, CategoryId = 8},

                new {Id = 10, ProductId = 4, CategoryId = 2},
                new {Id = 11, ProductId = 4, CategoryId = 5},
                new {Id = 12, ProductId = 4, CategoryId = 10},

                new {Id = 13, ProductId = 5, CategoryId = 2},
                new {Id = 14, ProductId = 5, CategoryId = 7},
                new {Id = 15, ProductId = 5, CategoryId = 10},

                new {Id = 16, ProductId = 6, CategoryId = 1},  //dames   
                new {Id = 17, ProductId = 6, CategoryId = 5},  //jeans
                new {Id = 18, ProductId = 6, CategoryId = 10}, 

                new {Id = 19, ProductId = 7, CategoryId = 2},
                new {Id = 20, ProductId = 7, CategoryId = 6},
                new {Id = 21, ProductId = 7, CategoryId = 9},

                new {Id = 22, ProductId = 8, CategoryId = 2},
                new {Id = 23, ProductId = 8, CategoryId = 3},
                new {Id = 24, ProductId = 8, CategoryId = 8},

                new {Id = 25, ProductId = 9, CategoryId = 1},
                new {Id = 26, ProductId = 9, CategoryId = 3},
                new {Id = 27, ProductId = 9, CategoryId = 10},

                new {Id = 28, ProductId = 10, CategoryId = 2},
                new {Id = 29, ProductId = 10, CategoryId = 4},
                new {Id = 30, ProductId = 10, CategoryId = 10}
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
                new{Id = 8, Name = "Voided", Description = "The balance on the transaction has been voided."}
                );
                
             // Add Admin account | Rank 1 = user, 2 = normale user, 3 = mod, 4 = admin|
            // Username:Password => admin:welkom01
            modelBuilder.Entity<User>().HasData(
                new User{Id = 1, Name = "admin", Email = "admin@hrfashion.nl", Salt = "Ukp7BqmIS61j+hZQ0BowmIKycaQ=" , Key = "smcJ/dBZATN4Mn117ExHtUwi6xA=", CreateOn = DateTime.Now, Rank = 4 }
            );

        }
    }
}


    
