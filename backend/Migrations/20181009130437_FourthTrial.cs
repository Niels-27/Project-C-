using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class FourthTrial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageName",
                value: "https://img.represent.com/uploads/c316464e3c69408be954c6d05edd10a9.jpg?auto=format&w=750");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageName",
                value: "https://assets.adidas.com/images/w_600,f_auto,q_auto/ab12ced1d0a14151b88ea7fa00ee94a1_9366/Superstar_Foundation_Shoes_Black_B27140_01_standard.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImageName",
                value: "https://kickz.akamaized.net/en/media/images/p/600/adidas-CLFN_T_Shirt-BLACK_MEDIUM_GREY_HEATHER_WHITE-1.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageName",
                value: "https://www.local-outerwear.eu/wp-content/uploads/2015/11/W16-902BJ-Dawn_Front.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageName",
                value: "https://images.esellerpro.com/2294/I/111/28/lrgscaleNH45BLACK_NEW.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "ImageName",
                value: "https://images-na.ssl-images-amazon.com/images/I/71lO9goTlGL._UY445_.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                column: "ImageName",
                value: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmSJ2f1znHd7v7lL18PLNS3A7dL_UQeuqU6NmiyscbY1NFRqpvJA");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                column: "ImageName",
                value: "https://dtpmhvbsmffsz.cloudfront.net/posts/2017/09/13/59b958a17f0a053a7b03e25f/m_59b958b8713fde7bfd03fda2.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                column: "ImageName",
                value: "https://images.timberland.com/is/image/timberland/10073009-HERO?$PDP-FULL-IMAGE$");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                column: "ImageName",
                value: "https://scene7.zumiez.com/is/image/zumiez/pdp_hero/DOPE-Global-Yellow-T-Shirt-_297867-front-US.jpg");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageName",
                value: "Black-History-Sweat-Shirt.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageName",
                value: "Gentleman-Shoes.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImageName",
                value: "Cool-Black-Tshirt.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageName",
                value: "Korean-Jeans.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageName",
                value: "Grafische-Sweat-Shirt.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "ImageName",
                value: "Sexy-Woman-Jeans-Denim-Blue.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                column: "ImageName",
                value: "Swag-Hoodie-Red.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                column: "ImageName",
                value: "White-Shoe-Adidas.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                column: "ImageName",
                value: "Swag-Boot-Black-Shoes.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                column: "ImageName",
                value: "Yellow-shirt.jpg");
        }
    }
}
