using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System;

using backend.ClassesForModel;

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
        }
    }
}


    