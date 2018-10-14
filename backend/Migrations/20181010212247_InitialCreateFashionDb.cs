using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace backend.Migrations
{
    public partial class InitialCreateFashionDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductSizes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    SizeName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductSizes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: true),
                    Email = table.Column<string>(maxLength: 100, nullable: true),
                    Password = table.Column<string>(maxLength: 100, nullable: true),
                    Salt = table.Column<string>(maxLength: 10, nullable: true),
                    Ip = table.Column<string>(maxLength: 15, nullable: true),
                    Rank = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Color = table.Column<string>(nullable: true),
                    Price = table.Column<decimal>(nullable: false),
                    ProductSizeId = table.Column<int>(nullable: false),
                    Amount = table.Column<int>(nullable: false),
                    ImageName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_ProductSizes_ProductSizeId",
                        column: x => x.ProductSizeId,
                        principalTable: "ProductSizes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    UserId = table.Column<int>(nullable: false),
                    PostalCode = table.Column<string>(maxLength: 10, nullable: true),
                    Street = table.Column<string>(nullable: true),
                    City = table.Column<string>(maxLength: 100, nullable: true),
                    CountryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Addresses_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Addresses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Discounts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ProductId = table.Column<int>(nullable: false),
                    DiscountPercentage = table.Column<float>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Discounts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductCategory",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ProductId = table.Column<int>(nullable: false),
                    CategoryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCategory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductCategory_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductCategory_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WishListProducts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    UserId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WishListProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WishListProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WishListProducts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    UserId = table.Column<int>(nullable: false),
                    StatusId = table.Column<int>(nullable: false),
                    AddressId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Statuses_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Statuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductsSold",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ProductId = table.Column<int>(nullable: false),
                    Amount = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    OrderId = table.Column<int>(nullable: false),
                    DiscountId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductsSold", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductsSold_Discounts_DiscountId",
                        column: x => x.DiscountId,
                        principalTable: "Discounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductsSold_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductsSold_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductsSold_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Dames" },
                    { 2, "Heren" },
                    { 3, "Schoenen" },
                    { 4, "Shirts" },
                    { 5, "Jeans" },
                    { 6, "Hoodies" },
                    { 7, "Vesten" }
                });

            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Nederland" });

            migrationBuilder.InsertData(
                table: "ProductSizes",
                columns: new[] { "Id", "SizeName" },
                values: new object[,]
                {
                    { 14, "41" },
                    { 15, "42" },
                    { 16, "43" },
                    { 17, "44" },
                    { 21, "48" },
                    { 19, "46" },
                    { 20, "47" },
                    { 13, "40" },
                    { 22, "49" },
                    { 18, "45" },
                    { 12, "39" },
                    { 11, "38" },
                    { 10, "37" },
                    { 1, "XS" },
                    { 3, "M" },
                    { 4, "L" },
                    { 5, "XL" },
                    { 2, "S" },
                    { 7, "34" },
                    { 8, "35" },
                    { 9, "36" },
                    { 6, "XXL" }
                });

            migrationBuilder.InsertData(
                table: "Statuses",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 7, "The payment for the transaction has been refunded.", "Refunded" },
                    { 1, "The transaction has been marked for review, typically by the payment gateway.", "Review" },
                    { 2, "The the purchase order for the transaction has been created.This status is set at the very onset of the transaction, typically before the invoiced balance is set, and before the paymentis authorized or paid.", "Purchase Order" },
                    { 3, "The transaction is invoiced, and the order total becomes an open balance.", "Invoiced" },
                    { 4, "The payment for the transaction has been authorized by the payment gateway.", "Authorized" },
                    { 5, "The payment for the transaction has been accepted by the payment gateway.", "Paid" },
                    { 6, "The order has been marked as shipped by the merchant.", "Shipped" },
                    { 8, "The balance on the transaction has been voided.", "Voided" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Amount", "Color", "Description", "ImageName", "Name", "Price", "ProductSizeId" },
                values: new object[,]
                {
                    { 6, 20, "Blauw", "Sexy strakke jeans voor vrouwen met scheuren.", "https://images-na.ssl-images-amazon.com/images/I/71lO9goTlGL._UY445_.jpg", "Sexy Vrouwen Jeans", 29.99m, 2 },
                    { 10, 20, "Geel", "Geel shirt voor heren. Opvallende kleur zodat iedereen je ziet staan.", "https://scene7.zumiez.com/is/image/zumiez/pdp_hero/DOPE-Global-Yellow-T-Shirt-_297867-front-US.jpg", "Geel Shirt", 14.99m, 2 },
                    { 1, 20, "Zwart", "Coole zwarte sweatshirt voor heren.", "https://img.represent.com/uploads/c316464e3c69408be954c6d05edd10a9.jpg?auto=format&w=750", "Zwarte Sweat Shirt", 39.99m, 3 },
                    { 3, 20, "Zwart", "Super coole Adidas swag shirt.", "https://kickz.akamaized.net/en/media/images/p/600/adidas-CLFN_T_Shirt-BLACK_MEDIUM_GREY_HEATHER_WHITE-1.jpg", "Adidas Swag Shirt", 24.99m, 3 },
                    { 4, 20, "Blauw", "Stoere Koreaanse Jeans van denim voor heren.", "https://www.local-outerwear.eu/wp-content/uploads/2015/11/W16-902BJ-Dawn_Front.jpg", "Koreaanse Jeans", 49.99m, 3 },
                    { 5, 20, "Black", "Super coole zwarte vest voor echte swaggers.", "https://images.esellerpro.com/2294/I/111/28/lrgscaleNH45BLACK_NEW.jpg", "Zwarte Vest", 79.99m, 4 },
                    { 7, 20, "Rood", "Thug Life rode swag hoodie voor jongens. Word een beest in deze hoodie!", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmSJ2f1znHd7v7lL18PLNS3A7dL_UQeuqU6NmiyscbY1NFRqpvJA", "Rode Swag Hoodie", 45.99m, 5 },
                    { 9, 20, "Zwart", "Swag Boots voor stoere vrouwen. Word de baddest chick in town.", "https://images.timberland.com/is/image/timberland/10073009-HERO?$PDP-FULL-IMAGE$", "Zwarte Swag Boots", 39.99m, 10 },
                    { 2, 20, "Zwart", "Gentleman schoenen voor echte heren", "https://assets.adidas.com/images/w_600,f_auto,q_auto/ab12ced1d0a14151b88ea7fa00ee94a1_9366/Superstar_Foundation_Shoes_Black_B27140_01_standard.jpg", "Zwarte Schoenen", 19.99m, 17 },
                    { 8, 20, "Wit", "Witte Swag Adidas schoenen voor heren. Boost je Imago en wordt de baddest boy in je omgeving met deze schoenen. ", "https://dtpmhvbsmffsz.cloudfront.net/posts/2017/09/13/59b958a17f0a053a7b03e25f/m_59b958b8713fde7bfd03fda2.jpg", "Witte Adidas Schoen", 17.99m, 19 }
                });

            migrationBuilder.InsertData(
                table: "ProductCategory",
                columns: new[] { "Id", "CategoryId", "ProductId" },
                values: new object[,]
                {
                    { 11, 1, 6 },
                    { 4, 3, 2 },
                    { 3, 2, 2 },
                    { 18, 3, 9 },
                    { 17, 1, 9 },
                    { 14, 6, 7 },
                    { 13, 2, 7 },
                    { 10, 7, 5 },
                    { 9, 2, 5 },
                    { 8, 5, 4 },
                    { 7, 2, 4 },
                    { 6, 4, 3 },
                    { 5, 2, 3 },
                    { 2, 4, 1 },
                    { 1, 2, 1 },
                    { 20, 4, 10 },
                    { 19, 2, 10 },
                    { 12, 5, 6 },
                    { 15, 2, 8 },
                    { 16, 3, 8 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_CountryId",
                table: "Addresses",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_UserId",
                table: "Addresses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Discounts_ProductId",
                table: "Discounts",
                column: "ProductId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_AddressId",
                table: "Orders",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_StatusId",
                table: "Orders",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductCategory_CategoryId",
                table: "ProductCategory",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductCategory_ProductId",
                table: "ProductCategory",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductSizeId",
                table: "Products",
                column: "ProductSizeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductsSold_DiscountId",
                table: "ProductsSold",
                column: "DiscountId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductsSold_OrderId",
                table: "ProductsSold",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductsSold_ProductId",
                table: "ProductsSold",
                column: "ProductId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductsSold_UserId",
                table: "ProductsSold",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WishListProducts_ProductId",
                table: "WishListProducts",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_WishListProducts_UserId",
                table: "WishListProducts",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductCategory");

            migrationBuilder.DropTable(
                name: "ProductsSold");

            migrationBuilder.DropTable(
                name: "WishListProducts");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Discounts");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DropTable(
                name: "ProductSizes");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
