using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class MigWithBrands : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 8, "Adidas" },
                    { 9, "Nike" },
                    { 10, "HRFashion" },
                    { 11, "Puma" },
                    { 12, "Timberland" },
                    { 13, "Reebok" },
                    { 14, "Vans" }
                });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 4,
                column: "CategoryId",
                value: 2);

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 3, 2 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 7,
                column: "ProductId",
                value: 3);

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 4, 3 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 2, 4 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 11,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 5, 4 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 13,
                column: "ProductId",
                value: 5);

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 14,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 7, 5 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 16,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 1, 6 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 17,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 5, 6 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 19,
                column: "ProductId",
                value: 7);

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 20,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 6, 7 });

            migrationBuilder.InsertData(
                table: "ProductCategory",
                columns: new[] { "Id", "CategoryId", "ProductId" },
                values: new object[,]
                {
                    { 22, 2, 8 },
                    { 23, 3, 8 },
                    { 25, 1, 9 },
                    { 26, 3, 9 },
                    { 28, 2, 10 },
                    { 29, 4, 10 }
                });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 10, 1 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 10, 2 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 8, 3 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 12,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 10, 4 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 15,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 10, 5 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 18,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 10, 6 });

            migrationBuilder.InsertData(
                table: "ProductCategory",
                columns: new[] { "Id", "CategoryId", "ProductId" },
                values: new object[,]
                {
                    { 24, 8, 8 },
                    { 21, 9, 7 },
                    { 27, 10, 9 },
                    { 30, 10, 10 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 2, 2 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 4,
                column: "CategoryId",
                value: 3);

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 2, 3 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 4, 3 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 7,
                column: "ProductId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 5, 4 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 2, 5 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 7, 5 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 11,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 1, 6 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 12,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 5, 6 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 13,
                column: "ProductId",
                value: 7);

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 14,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 6, 7 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 15,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 2, 8 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 16,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 3, 8 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 17,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 1, 9 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 18,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 3, 9 });

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 19,
                column: "ProductId",
                value: 10);

            migrationBuilder.UpdateData(
                table: "ProductCategory",
                keyColumn: "Id",
                keyValue: 20,
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 4, 10 });
        }
    }
}
