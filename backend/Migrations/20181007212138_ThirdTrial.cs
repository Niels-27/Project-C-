using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class ThirdTrial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Products",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 100,
                oldNullable: true);

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

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Amount", "Color", "Description", "ImageName", "Name", "ProductSizeId" },
                values: new object[] { 20, "Zwart", "Coole zwarte sweatshirt voor heren.", "Black-History-Sweat-Shirt.jpg", "Zwarte Sweat Shirt", 3 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Amount", "Color", "Description", "Name", "Price", "ProductSizeId" },
                values: new object[] { 20, "Zwart", "Gentleman schoenen voor echte heren", "Zwarte Schoenen", 19.99m, 17 });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Amount", "Color", "Description", "ImageName", "Name", "Price", "ProductSizeId" },
                values: new object[,]
                {
                    { 10, 20, "Geel", "Geel shirt voor heren. Opvallende kleur zodat iedereen je ziet staan.", "Yellow-shirt.jpg", "Geel Shirt", 14.99m, 2 },
                    { 9, 20, "Zwart", "Swag Boots voor stoere vrouwen. Word de baddest chick in town.", "Swag-Boot-Black-Shoes.jpg", "Zwarte Swag Boots", 39.99m, 10 },
                    { 8, 20, "Wit", "Witte Swag Adidas schoenen voor heren. Boost je Imago en wordt de baddest boy in je omgeving met deze schoenen. ", "White-Shoe-Adidas.jpg", "Witte Adidas Schoen", 17.99m, 19 },
                    { 7, 20, "Rood", "Thug Life rode swag hoodie voor jongens. Word een beest in deze hoodie!", "Swag-Hoodie-Red.jpg", "Rode Swag Hoodie", 45.99m, 5 },
                    { 5, 20, "Black", "Super coole zwarte vest voor echte swaggers.", "Grafische-Sweat-Shirt.jpg", "Zwarte Vest", 79.99m, 4 },
                    { 4, 20, "Blauw", "Stoere Koreaanse Jeans van denim voor heren.", "Korean-Jeans.jpg", "Koreaanse Jeans", 49.99m, 3 },
                    { 3, 20, "Zwart", "Super coole Adidas swag shirt.", "Cool-Black-Tshirt.jpg", "Adidas Swag Shirt", 24.99m, 3 },
                    { 6, 20, "Blauw", "Sexy strakke jeans voor vrouwen met scheuren.", "Sexy-Woman-Jeans-Denim-Blue.jpg", "Sexy Vrouwen Jeans", 29.99m, 2 }
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
                table: "ProductCategory",
                columns: new[] { "Id", "CategoryId", "ProductId" },
                values: new object[,]
                {
                    { 1, 2, 1 },
                    { 18, 3, 9 },
                    { 17, 1, 9 },
                    { 16, 3, 8 },
                    { 15, 2, 8 },
                    { 14, 6, 7 },
                    { 13, 2, 7 },
                    { 12, 5, 6 },
                    { 11, 1, 6 },
                    { 10, 7, 5 },
                    { 9, 2, 5 },
                    { 8, 5, 4 },
                    { 7, 2, 4 },
                    { 6, 4, 3 },
                    { 5, 2, 3 },
                    { 2, 4, 1 },
                    { 4, 3, 2 },
                    { 3, 2, 2 },
                    { 19, 2, 10 },
                    { 20, 4, 10 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Products",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Amount", "Color", "Description", "ImageName", "Name", "ProductSizeId" },
                values: new object[] { 5, "Pink", "Very Beautiful Japanese Style Dress in color Pink", "Pink-Harajuku-Dress.jpg", "Harajuku Pink Dress", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Amount", "Color", "Description", "Name", "Price", "ProductSizeId" },
                values: new object[] { 2, "Black", "Gentleman Shoes for real Gentleman", "Black Gentleman Shoes", 79.99m, 20 });
        }
    }
}
