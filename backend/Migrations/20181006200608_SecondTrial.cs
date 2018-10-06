using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class SecondTrial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "SizeName",
                table: "ProductSizes",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Products",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Products",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageName",
                table: "Products",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Street",
                table: "Addresses",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "ProductSizes",
                columns: new[] { "Id", "SizeName" },
                values: new object[,]
                {
                    { 1, "XS" },
                    { 20, "47" },
                    { 19, "46" },
                    { 18, "45" },
                    { 17, "44" },
                    { 16, "43" },
                    { 15, "42" },
                    { 14, "41" },
                    { 13, "40" },
                    { 12, "39" },
                    { 11, "38" },
                    { 10, "37" },
                    { 9, "36" },
                    { 8, "35" },
                    { 7, "34" },
                    { 6, "XXL" },
                    { 5, "XL" },
                    { 4, "L" },
                    { 3, "M" },
                    { 2, "S" },
                    { 21, "48" },
                    { 22, "49" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Amount", "Color", "Description", "ImageName", "Name", "Price", "ProductSizeId" },
                values: new object[] { 1, 5, "Pink", "Very Beautiful Japanese Style Dress in color Pink", "Pink-Harajuku-Dress.jpg", "Harajuku Pink Dress", 39.99m, 2 });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Amount", "Color", "Description", "ImageName", "Name", "Price", "ProductSizeId" },
                values: new object[] { 2, 2, "Black", "Gentleman Shoes for real Gentleman", "Gentleman-Shoes.jpg", "Black Gentleman Shoes", 79.99m, 20 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ProductSizes",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DropColumn(
                name: "ImageName",
                table: "Products");

            migrationBuilder.AlterColumn<int>(
                name: "SizeName",
                table: "ProductSizes",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Products",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Products",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Street",
                table: "Addresses",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
