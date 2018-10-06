﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using backend.Models;

namespace backend.Migrations
{
    [DbContext(typeof(FashionContext))]
    partial class FashionContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("backend.ClassesForModel.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City")
                        .HasMaxLength(100);

                    b.Property<int>("CountryId");

                    b.Property<string>("PostalCode")
                        .HasMaxLength(10);

                    b.Property<string>("Street");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("CountryId");

                    b.HasIndex("UserId");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("backend.ClassesForModel.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("backend.ClassesForModel.Country", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("backend.ClassesForModel.Discount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<float>("DiscountPercentage");

                    b.Property<DateTime>("EndDate");

                    b.Property<int>("ProductId");

                    b.Property<DateTime>("StartDate");

                    b.HasKey("Id");

                    b.HasIndex("ProductId")
                        .IsUnique();

                    b.ToTable("Discounts");
                });

            modelBuilder.Entity("backend.ClassesForModel.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AddressId");

                    b.Property<int>("StatusId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.HasIndex("StatusId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("backend.ClassesForModel.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Amount");

                    b.Property<string>("Color");

                    b.Property<string>("Description")
                        .HasMaxLength(100);

                    b.Property<string>("ImageName");

                    b.Property<string>("Name");

                    b.Property<decimal>("Price");

                    b.Property<int>("ProductSizeId");

                    b.HasKey("Id");

                    b.HasIndex("ProductSizeId");

                    b.ToTable("Products");

                    b.HasData(
                        new { Id = 1, Amount = 5, Color = "Pink", Description = "Very Beautiful Japanese Style Dress in color Pink", ImageName = "Pink-Harajuku-Dress.jpg", Name = "Harajuku Pink Dress", Price = 39.99m, ProductSizeId = 2 },
                        new { Id = 2, Amount = 2, Color = "Black", Description = "Gentleman Shoes for real Gentleman", ImageName = "Gentleman-Shoes.jpg", Name = "Black Gentleman Shoes", Price = 79.99m, ProductSizeId = 20 }
                    );
                });

            modelBuilder.Entity("backend.ClassesForModel.ProductCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CategoryId");

                    b.Property<int>("ProductId");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("ProductId");

                    b.ToTable("ProductCategory");
                });

            modelBuilder.Entity("backend.ClassesForModel.ProductSize", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("SizeName");

                    b.HasKey("Id");

                    b.ToTable("ProductSizes");

                    b.HasData(
                        new { Id = 1, SizeName = "XS" },
                        new { Id = 2, SizeName = "S" },
                        new { Id = 3, SizeName = "M" },
                        new { Id = 4, SizeName = "L" },
                        new { Id = 5, SizeName = "XL" },
                        new { Id = 6, SizeName = "XXL" },
                        new { Id = 7, SizeName = "34" },
                        new { Id = 8, SizeName = "35" },
                        new { Id = 9, SizeName = "36" },
                        new { Id = 10, SizeName = "37" },
                        new { Id = 11, SizeName = "38" },
                        new { Id = 12, SizeName = "39" },
                        new { Id = 13, SizeName = "40" },
                        new { Id = 14, SizeName = "41" },
                        new { Id = 15, SizeName = "42" },
                        new { Id = 16, SizeName = "43" },
                        new { Id = 17, SizeName = "44" },
                        new { Id = 18, SizeName = "45" },
                        new { Id = 19, SizeName = "46" },
                        new { Id = 20, SizeName = "47" },
                        new { Id = 21, SizeName = "48" },
                        new { Id = 22, SizeName = "49" }
                    );
                });

            modelBuilder.Entity("backend.ClassesForModel.ProductSold", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Amount");

                    b.Property<DateTime>("Date");

                    b.Property<int>("DiscountId");

                    b.Property<int>("OrderId");

                    b.Property<int>("ProductId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("DiscountId");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductId")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("ProductsSold");
                });

            modelBuilder.Entity("backend.ClassesForModel.Status", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("Statuses");
                });

            modelBuilder.Entity("backend.ClassesForModel.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .HasMaxLength(100);

                    b.Property<string>("Ip")
                        .HasMaxLength(15);

                    b.Property<string>("Name")
                        .HasMaxLength(100);

                    b.Property<string>("Password")
                        .HasMaxLength(100);

                    b.Property<int>("Rank");

                    b.Property<string>("Salt")
                        .HasMaxLength(10);

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("backend.ClassesForModel.WishListProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ProductId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("UserId");

                    b.ToTable("WishListProducts");
                });

            modelBuilder.Entity("backend.ClassesForModel.Address", b =>
                {
                    b.HasOne("backend.ClassesForModel.Country", "Country")
                        .WithMany("Addresses")
                        .HasForeignKey("CountryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.ClassesForModel.User", "User")
                        .WithMany("Addresses")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.ClassesForModel.Discount", b =>
                {
                    b.HasOne("backend.ClassesForModel.Product", "Product")
                        .WithOne("Discount")
                        .HasForeignKey("backend.ClassesForModel.Discount", "ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.ClassesForModel.Order", b =>
                {
                    b.HasOne("backend.ClassesForModel.Address", "Address")
                        .WithMany("Orders")
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.ClassesForModel.Status", "Status")
                        .WithMany("Order")
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.ClassesForModel.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.ClassesForModel.Product", b =>
                {
                    b.HasOne("backend.ClassesForModel.ProductSize", "ProductSize")
                        .WithMany("Products")
                        .HasForeignKey("ProductSizeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.ClassesForModel.ProductCategory", b =>
                {
                    b.HasOne("backend.ClassesForModel.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.ClassesForModel.Product", "Product")
                        .WithMany("Categories")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.ClassesForModel.ProductSold", b =>
                {
                    b.HasOne("backend.ClassesForModel.Discount", "Discount")
                        .WithMany("ProductsSold")
                        .HasForeignKey("DiscountId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.ClassesForModel.Order", "Order")
                        .WithMany("ProductsSold")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.ClassesForModel.Product", "Product")
                        .WithOne("ProductSold")
                        .HasForeignKey("backend.ClassesForModel.ProductSold", "ProductId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.ClassesForModel.User", "User")
                        .WithMany("ProductsSold")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.ClassesForModel.WishListProduct", b =>
                {
                    b.HasOne("backend.ClassesForModel.Product", "Product")
                        .WithMany("WishListProducts")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.ClassesForModel.User", "User")
                        .WithMany("WishListProducts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
