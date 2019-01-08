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
modelBuilder.Entity<Product>().HasData(new Product{Id = 1, Name = "Stan Smith Schoenen",    //#1
Description = "Deze gestroomlijnde schoen, in 1971 speciaal ontworpen voor tennislegende Stan Smith, heeft een bijzondere plek in de stijlgeschiedenis. Het gladde bovenwerk van volnerfleer met geperforeerde 3-Stripes en de rubberen loopzool in een bijpassende kleur hebben van de low-top een waar sneakericoon gemaakt.", Color = "Wit", 
Price = 94.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/4edaa6d5b65a40d19f20a7fa00ea641f_9366/Stan_Smith_Schoenen_wit_M20325_01_standard.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 2 , Name = "Adidas Superstar",    //#2
Description = "Deze jaren 70-sneaker begon zijn leven als een basketbalschoen die het hele veld beheerste. Het duurde niet lang voor hij binnendrong in de skateboardwereld en die van de streetstyle (om nog maar te zwijgen over het hoofdpodium van de hiphop). De schoen houdt z'n look klassiek met een gecoat leren bovenwerk. Met alle authentieke details, waaronder gekartelde 3-Stripes en de karakteristieke rubberen shell-toe.", Color = "Wit", 
Price = 99.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/d285610e30664900b857a7fa00ed0201_9366/Superstar_Schoenen_wit_C77124_01_standard.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 3, Name = "Adidas SambaRose",    //#3
Description = "Deze schoen verandert het klassieke silhouet van de Samba in een trendy platformsneaker met een vrouwelijke twist. Het leren bovenwerk is bedrukt met een slangenhuidreliëf en de dikke platformzool maakt 'm het hoogtepunt van trendy stijl.", Color = "Roze", 
Price = 79.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/b645e657b95646b3a1c7a90000f6b358_9366/SAMBAROSE_Schoenen_roze_B28164_01_standard.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 4 , Name = "Nike Air Force 1",    //#4
Description = "De legende leeft voort in de Nike Air Force 1 '07 damesschoen, een moderne uitvoering van het icoon waarin klassieke stijl en moderne, frisse details samenkomen.", Color = "Wit", 
Price = 100.00M, ProductSizeId = 3, Amount = 20, ImageName="https://c.static-nike.com/a/images/f_auto,b_rgb:f5f5f5,w_880/up7tdgif09cvhfiuxtta/air-force-1-07-damesschoen-yATYOKl8.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 5 , Name = "Nike Air VaporMax ",    //#5
Description = "De op ruimtereizen geïnspireerde Nike Air VaporMax 19 'Space Walk' verlegt grenzen, waardoor het lijkt of je op lucht loopt. Met een buitenaardse kleurencombinatie wordt de Nike Air VaporMax 19 jouw beste schoen ooit.", Color = "Goud", 
Price = 190.00M, ProductSizeId = 3, Amount = 20, ImageName="https://c.static-nike.com/a/images/f_auto,b_rgb:f5f5f5,w_880/ywxe20sregbymtn7eeow/air-vapormax-2019-damesschoen-FK51kR.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 6 , Name = "Nike Air Max 95 ",    //#6
Description = "Deze versie van de Nike Air Max 95 behoudt de iconische look van de AM95, maar heeft een voering van zachte, dikke stof om je voeten warm te houden als de temperatuur daalt.", Color = "Roze", 
Price = 180.00M, ProductSizeId = 3, Amount = 20, ImageName="https://www.nike.com/nl/t/air-max-95-winterized-damesschoen-gkDT6T/BV0309-200"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 7 , Name = "Puma Basket Heart",    //#7
Description = "Met een eigen draai aan een van PUMA's meest herkenbare modellen heeft deze Basket-uitvoering all kenmerken van de iconische versie, zoals de beroemde smalle tooling en lange, strakke lijnen, maar dan met een brede, strikachtige sluiting zodat je zowel een stoer als vrouwelijk gevoel hebt in deze coole, casual look.", Color = "Zwart", 
Price = 70.00M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/363073/01/fnd/EEA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 8 , Name = "Puma Thunder Leather",    //#8
Description = "De Thunder Leather betoont eer aan eerdere samenwerkingen en modellen die vooruit waren op hun tijd. Geïnspireerd door CELL System hardloopmodellen van de jaren '90 en de samenwerking PUMA x McQueen kreeg dit vernieuwde paar een overdadige, grove, ongegeneerde uitstraling. De uitvergrote retro tooling, de opgeblazen proporties en de schreeuwende kleurvlakken reserveren voor de Thunder een plek in de internationale pistes.", Color = "Wit", 
Price = 130.00M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/370682/01/fnd/EEA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 9 , Name = "Puma Suede Bow Block",    //#9
Description = "Geïnspireerd door een van de meest bekende damesmode-accessoires, de STRIK, combineert deze koningin met kleurvlakken van de PUMA Suedes stoutmoedigheid met het vrouwelijke. Volledig suede, volledige stijl ... volledig goed.", Color = "Zwart", 
Price = 70.00M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/367453/02/fnd/EEA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 10  , Name = "Premium 6-Inch Boots",    //# 10
Description = "Klassiek vakmanschap vormt deze nieuwe, stoere Timberland® 6-inch boot.", Color = "Roze", 
Price = 153.95M, ProductSizeId = 3, Amount = 20, ImageName="https://images.timberland.com/is/image/TimberlandEU/A1K3Z662-alt1?$VFDP-VIEWER-ZOOMVIEW-HERO$&id=06dRL3&wid=773&hei=773&fmt=jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 11  , Name = "Original 6-Inch Boots",    //#
Description = "Klassiek vakmanschap vormt deze nieuwe, stoere Timberland® 6-inch boot.", Color = "Bruin", 
Price = 180.00M, ProductSizeId = 3, Amount = 20, ImageName="https://images.timberland.com/is/image/TimberlandEU/A1SI1231-alt1?$VFDP-VIEWER-ZOOMVIEW-HERO$&id=miRR73&wid=773&hei=773&fmt=jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 12  , Name = "Reebok Daytona DMX",    //#
Description = "De Daytona DMX debuteerde in 2000 met een stevige en opvallende look. Deze hoge schoenen pronken met een strak en gestroomlijnd bovenwerk. Ze hebben DMX-schokdemping voor comfort dat de hele dag duurt.", Color = "Zwart", 
Price = 119.95M, ProductSizeId = 3, Amount = 20, ImageName="https://www.reebok.nl/dis/dw/image/v2/AAJP_PRD/on/demandware.static/-/Sites-reebok-products/default/dwf833e1a9/zoom/CN8386_03_standard.jpg?sh=840&strip=false&sw=840"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 13 , Name = "Reebok Club C 85",    //#
Description = "Je hoort er helemaal bij in deze nieuwe uitvoering van onze klassieke Club C schoen. Het bovenwerk van zacht leer zorgt voor superieure ondersteuning en kwaliteit. De middenzool biedt schokdemping bij iedere stap en het tijdloze Reebok venster met logo geeft 'm een casual en toch elegante stijl.", Color = "Wit", 
Price = 79.95M, ProductSizeId = 3, Amount = 20, ImageName="https://www.reebok.nl/dis/dw/image/v2/AAJP_PRD/on/demandware.static/-/Sites-reebok-products/default/dwc4a498af/zoom/AR0456_01_standard.jpg?sh=840&strip=false&sw=840"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 14  , Name = "Vans Satin SK8-Hi",    //#
Description = "Het satijnen Festival Pack geeft met zijn weelderige satijnen afwerking en sierlijke details het traditionele gebloemde brokaat een Californische look. De satijnen Festival Sk8-Hi Reissue beschikt over de perfecte hoeveelheid glans en weelderigheid. Het is een combinatie van de legendarische hoge schoen van Vans met een bovenwerk van stevig suède en textiel, een verstevigde neus tegen slijtage, een gevoerde kraag voor ondersteuning en flexibiliteit en de kenmerkende rubberen wafelzool.", Color = "Rood", 
Price = 100.00M, ProductSizeId = 3, Amount = 20, ImageName="https://images.vans.com/is/image/VansEU/VN0A2XSBULP-HERO?$PDP-FULL-IMAGE$"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 15 , Name = "Vans Old School",    //#
Description = "De Old Skool, de klassieke skateschoen van Vans en de eerste met de iconische Side Stripe, is een lage veterschoen met een bovenkant van stevig canvas, een verstevigde neus tegen slijtage, een gevoerde kraag voor ondersteuning en flexibiliteit en de kenmerkende rubberen wafelzool.", Color = "Rood", 
Price = 64.00M, ProductSizeId = 3, Amount = 20, ImageName="https://images.vans.com/is/image/VansEU/VN0A38G1UKZ-HERO?$VFDP-VIEWER-ZOOMVIEW-HERO$&id=z-pQx3&wid=843&hei=843&fmt=jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 16  , Name = "Adidas 3-Stripes longsleeve",    //#
Description = "Deze longsleeve heeft authentieke historische stijl. Contrasterende 3-Stripes en een Trefoil-logo creëren een moderne, sportieve look. Door de stretchy katoenen jersey voelt 't shirt zacht aan.", Color = "Zwart", 
Price = 39.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/33343cdd35414a8aadc5a991010dc7a2_9366/3-Stripes_T-shirt_zwart_DV2608_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 17, Name = "Adidas 3-Stripe T-Shirt",    //#
Description = "Dit dames-T-shirt krijgt een update voor het nu, maar blijft trouw aan de authentieke sport-looks. Het ruime shirt is simpelweg een klassieker, met de contrasterende logodetails zoals 3-Stripes op de mouwen en een klein Trefoil-logo op de borst. Gemaakt van katoenen jersey voor een zacht gevoel.", Color = "Roze", 
Price = 29.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/6800c63ae4724fe296e8a8f000c14516_9366/3-Stripes_T-shirt_rood_DH3141_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 18  , Name = "Adidas Sporting T-Shirt",    //#
Description = "Dit T-shirt is gemaakt van zachte, 100% biologisch katoenen jersey. Het heeft een relaxte pasvorm voor een hele dag comfort.", Color = "Rood", 
Price = 29.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/8e2ba758ac1f4740b038a93e012b292d_9366/Coeeze_T-shirt_rood_DU7189_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 19 , Name = "Nike Essential Cropped",    //#
Description = "De Nike Essential Cropped damestop met korte mouwen is gemaakt van zacht materiaal en heeft een kort design dat altijd comfortabel zit en fijn met laagjes gedragen kan worden.", Color = "Grijs", 
Price = 22.95M, ProductSizeId = 3, Amount = 20, ImageName="https://c.static-nike.com/a/images/f_auto,b_rgb:f5f5f5,w_880/vmcwgqxxtqaztzntbtoe/essential-cropped-damestop-met-korte-mouwen-fpgVjn.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 20 , Name = "NiKe Sportswear T-Shirt",    //#
Description = "https://c.static-nike.com/a/images/f_auto,b_rgb:f5f5f5,w_880/tlhip5ivgvffmmznd58o/sportswear-metallic-damestop-met-korte-mouwen-r2FSRc.jpg", Color = "Zwart", 
Price = 38.00M, ProductSizeId = 3, Amount = 20, ImageName="https://c.static-nike.com/a/images/f_auto,b_rgb:f5f5f5,w_880/tlhip5ivgvffmmznd58o/sportswear-metallic-damestop-met-korte-mouwen-r2FSRc.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 21 , Name = "Nike Air T-Shirt",    //#
Description = "Damestop met korte mouwen", Color = "Wit", 
Price = 35.00M, ProductSizeId = 3, Amount = 20, ImageName="https://c.static-nike.com/a/images/f_auto,b_rgb:f5f5f5,w_880/xzjwgaqwrnnmpn7qyku1/air-damestop-met-korte-mouwen-SmsZMd.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 22  , Name = "Puma x Pepsi AOP Crop Tee",    //#
Description = "We hebben nieuwe uitrusting voor onze meest legendarische bemanning. De lifestyle-producten van PUMA zijn geïnspireerd op sport en bieden toch een slanke, trendy look.", Color = "Wit", 
Price = 24.99M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/579272/01/fnd/PNA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 23  , Name = "Puma Sport T-Shirt",    //#
Description = "Bereid u voor op topprestaties in deze hypermoderne trainingstop.", Color = "Roze", 
Price = 24.95M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/516664/07/fnd/PNA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 24  , Name = "Puma x Karl T-Shirt ",    //#
Description = "Een mode-icoon ontmoet een straaticoon in onze PUMA Suede-samenwerking met KARL LAGERFELD.", Color = "Wit", 
Price = 34.99M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/577575/02/fnd/PNA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 25 , Name = "Reebok Logo T-Shirt",    //#
Description = "Het slanke shirt heeft een oversized Reebok logo op de borst.", Color = "Wit", 
Price = 24.95M, ProductSizeId = 3, Amount = 20, ImageName="https://www.reebok.nl/dis/dw/image/v2/AAJP_PRD/on/demandware.static/-/Sites-reebok-products/default/dwd4e96262/zoom/DP6692_01_standard.jpg?sh=600&strip=false&sw=600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 26  , Name = "Reebok Classica T-Shirt",    //#
Description = "De stijl van gister helemaal van nu. Dit korte dames-T-shirt houdt de look simpel en de uitstraling relaxed. Het retro Vector-logo staat trots op de voorkant van dit katoenen T-shirt.", Color = "Zwart", 
Price = 24.95M, ProductSizeId = 3, Amount = 20, ImageName="https://www.reebok.nl/dis/dw/image/v2/AAJP_PRD/on/demandware.static/-/Sites-reebok-products/default/dwdee0d937/zoom/DX3943_01_standard.jpg?sh=600&strip=false&sw=600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 27 , Name = "Vans Spotted Boxy Tee",    //#
Description = "De Spotted Boxy Tee is van een zware kwaliteit 100% katoenjersey. Op de voorkant van het shirt prijkt een bijzonder Vans-logo.", Color = "Wit", 
Price = 30.00M, ProductSizeId = 3, Amount = 20, ImageName="https://images.vans.com/is/image/VansEU/VN0A3T8YFS8-ALT9?$VFDP-VIEWER-ZOOMVIEW-HERO$&id=m1pQn3&wid=843&hei=843&fmt=jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 28 , Name = "Vans Junction Top",    //#
Description = "De Design Assembly-collectie combineert vooruitstrevend modedesign met een streetlook en brengt stijlvolle kleding met details. De Junction Top heeft de comfortabele, behaaglijke en oversized pasvorm van herenkleding waar we zo van houden, gecombineerd met een vrouwelijke touch.", Color = "Bruin", 
Price = 40.00M, ProductSizeId = 3, Amount = 20, ImageName="https://images.vans.com/is/image/VansEU/VN0A3T9RUOH-ALT9?$VFDP-VIEWER-ZOOMVIEW-HERO$&id=JkIQH3&wid=843&hei=843&fmt=jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 29 , Name = "Super Skinny Jeans",    //#
Description = "", Color = "Blauw", 
Price = 39.99M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic04.ztat.net/vgs/media/packshot/pdp-zoom/GS/12/1N/06/BK/12/GS121N06B-K12@12.1.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 30 , Name = "Zwarte Jeans",    //#
Description = "", Color = "Zwart", 
Price = 27.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/NL/02/1N/0B/PQ/11/NL021N0BP-Q11@15.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 31  , Name = "Katoene Skinny Jeans",    //#
Description = "", Color = "Zwart", 
Price = 49.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/TP/72/1N/09/QQ/11/TP721N09Q-Q11@17.1.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 32 , Name = "Skinny Fit Denim",    //#
Description = "", Color = "Grijs", 
Price = 24.45M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/EV/B2/1N/00/DC/11/EVB21N00D-C11@12.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 33 , Name = "Katoene Jeans",    //#
Description = "", Color = "Rood", 
Price = 19.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/NM/32/1N/0D/KG/11/NM321N0DK-G11@12.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 34 , Name = "Gestreepte Skinny Jeans",    //#
Description = "", Color = "Zwart", 
Price = 39.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic04.ztat.net/vgs/media/packshot/pdp-zoom/BE/J2/1N/01/0T/11/BEJ21N010-T11@21.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 35 , Name = "Skiny Biker Jeans",    //#
Description = "", Color = "Zwart", 
Price = 39.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/ON/32/1N/06/QQ/11/ON321N06Q-Q11@14.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 36 , Name = "Skinny Fit Jeans",    //#
Description = "", Color = "Blauw", 
Price = 45.00M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/ON/32/1N/0U/8K/11/ON321N0U8-K11@16.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 37 , Name = "Adidas Cropped Hoodie",    //#
Description = "Deze dameshoodie is geïnspireerd op looks die zijn opgegraven uit de archieven van adidas. De relaxte pullover is gemaakt van French terry badstof en heeft een trendy korter model.", Color = "Wit", 
Price = 59.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/7f848cc99cb440ba9bbaa9a60149a2ac_9366/Cropped_Hoodie_wit_DX2321_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 38, Name = "Adidas Graphic Hoodie",    //#
Description = "Een hoodie boordevol adidas-energie. De opvallende contrasterende graphics zijn niet te missen op de zachte French terry badstof. Het lange model geeft 'm niet alleen een casual, moderne uitstraling, maar biedt ook extra bedekking.", Color = "Roze", 
Price = 54.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/cf378368ae9b470898b5a966013ef10e_9366/Graphic_Hoodie_roze_DW8019_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 39 , Name = "Adidas Trefoil Hoodie",    //#
Description = "Een sportieve basic, doordrenkt met een moderne spirit. Dit damessweatshirt barst van de authentieke adidas-stijl dankzij een oversized Trefoil-logo op de voorkant.", Color = "Geel", 
Price = 34.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/ae25d42b72c04d80bfe8a8c000e26c6e_9366/Trefoil_Hoodie_oranje_DH3138_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 40 , Name = "Nike Retro Hoodie",    //#
Description = "Roze Retro Hoodie", Color = "Roze", 
Price = 49.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic04.ztat.net/vgs/media/packshot/pdp-zoom/NI/12/1J/09/2J/11/NI121J092-J11@4.png"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 41 , Name = "Nike Cropped Hoodie",    //#
Description = "Super mooie Nike Hoodie", Color = "Wit", 
Price = 39.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/NI/12/1J/09/0C/11/NI121J090-C11@14.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 42 , Name = "Nike Classic Hoodie",    //#
Description = "Nike Hoodie voor de dames", Color = "Roze", 
Price = 49.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/NI/12/1J/09/UG/11/NI121J09U-G11@5.png"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 43 , Name = "Puma Cropped Hoodie",    //#
Description = "Combineer de legging of sweatpants die je figuur omhult met deze cropped hoodie van fleece hoodie voor die echt onoverwinnelijke sportieve street-look.", Color = "Wit", 
Price = 49.95M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/845151/01/fnd/EEA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 44 , Name = "Puma Fleece Hoodie",    //#
Description = "Maak het meeste van je stijl en ga voor het grootste comfort met deze cropped pullover-sweater uitgevoerd in warme, zachte fleece van katoenmix.", Color = "Zwart", 
Price = 49.95M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/845146/02/fnd/EEA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 45 , Name = "Puma P Hoodie",    //#
Description = "Deze innovatieve vrouwelijke hoodie - perfect voor training - zal zeker blijvend opvallen.", Color = "Roze", 
Price = 39.95M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/518059/02/fnd/EEA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 46 , Name = "Reebok Classic Hoodie",    //#
Description = "Een terugblik op de goede oude tijd. Dit damessweatshirt houdt de look simpel. Het retro Vector-logo staat trots voorop. Contrasterende details geven deze zachte fleecetrui een verfrissende uitstraling.", Color = "Zwart", 
Price = 49.95M, ProductSizeId = 3, Amount = 20, ImageName="https://www.reebok.nl/dis/dw/image/v2/AAJP_PRD/on/demandware.static/-/Sites-reebok-products/default/dwe1d56102/zoom/DT7199_01_standard.jpg?sh=840&strip=false&sw=840"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 47 , Name = "Adidas Zip Hoodie",    //#
Description = "Deze hoodie is geïnspireerd op de opvallende, schuine lijnen van adidas Equipment-stijl uit de jaren 90. De geometrische 3-Stripes zijn gemaakt van badstof voor extra textuur.", Color = "Wit", 
Price = 69.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/1eee042d47604faa87f5a93c011d2012_9366/Zip_Hoodie_wit_DU9540_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 48 , Name = "Adidas Sport Vest",    //#
Description = "Deze zachte hoodie heeft een hoge halslijn en een ruime capuchon voor volledige bedekking om 'in the zone' te komen. ", Color = "Roze", 
Price = 59.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/ee3fd1bfbe704ef89521a9910157a3ad_9366/adidas_Z_N_E__Fast_Release_Hoodie_roze_DT9397_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 49 , Name = "Adidas Street Hoodie",    //#
Description = "Zacht comfort voor na je workout. Deze sportieve, moderne hoodie heeft een behaaglijk relaxte pasvorm met verlaagde schouders. Het model van een gebreide katoenmix is afgewerkt met adidas-graphics en een lange ritssluiting. ", Color = "Zwart", 
Price = 49.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/016fca67ea8e4b81bea6a981013da03a_9366/Sport_2_Street_Knit_Hoodie_zwart_DV0780_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 50 , Name = "Nike Gym Vest",    //#
Description = "Zacht comfort vest voor alle gelegenheden", Color = "Roze", 
Price = 29.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/NI/12/1J/07/1J/12/NI121J071-J12@6.1.png"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 51 , Name = "Nike Sport Vest",    //#
Description = "Zacht comfort voor na je workout.", Color = "Wit", 
Price = 34.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/NI/12/1I/00/6Q/11/NI121I006-Q11@1.1.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 52 , Name = "Reebok Vest",    //#
Description = "De Reebok Archive maakt een comeback met de klassieke lijnen van dit vest", Color = "Wit", 
Price = 69.95M, ProductSizeId = 3, Amount = 20, ImageName="https://www.reebok.nl/dis/dw/image/v2/AAJP_PRD/on/demandware.static/-/Sites-reebok-products/default/dw4a96c026/zoom/DH1343_01_standard.jpg?sh=840&strip=false&sw=840"});

// Mannen

modelBuilder.Entity<Product>().HasData(new Product{Id =  53, Name = "Nike Air Max Plus",    //#
Description = "De Nike Air Max Plus herenschoen doet denken aan de legendarische Tuned Air demping en de energieke designlijnen van het origineel uit 1998.", Color = "Zwart", 
Price = 169.99M, ProductSizeId = 3, Amount = 20, ImageName="https://c.static-nike.com/a/images/f_auto,b_rgb:f5f5f5,q_80,w_440/lggqeeldzz7qlodfybfp/air-max-plus-herenschoen-F5SqNr.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 54 , Name = "Nike Air VaporMax Utility",    //#
Description = "De Nike Air VaporMax Utility is vernieuwd om natte en donkere weersomstandigheden te kunnen trotseren.", Color = "Wit", 
Price = 209.95M, ProductSizeId = 3, Amount = 20, ImageName="https://c.static-nike.com/a/images/f_auto,b_rgb:f5f5f5,q_80,w_440/wkwbsvqqfflqfxdsap5k/air-vapormax-utility-herenschoen-PTmtGw.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 55 , Name = "Nike Air Jordan 1 Mid",    //#
Description = "De Air Jordan 1 Mid herenschoen is geïnspireerd op het origineel uit 1985 en grijpt terug op de revolutionaire schoen die MJ droeg tijdens zijn eerste seizoen en zijn eerste All-Star wedstrijd.", Color = "Zwart", 
Price = 109.99M, ProductSizeId = 3, Amount = 20, ImageName="https://c.static-nike.com/a/images/f_auto,b_rgb:f5f5f5,w_880/z504xdwoibpikjwehvb4/air-jordan-1-mid-herenschoen-VrTWX9K1.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 56 , Name = "Adidas NMD_R1",    //#
Description = "Straatwaardige stijl bomvol innovatie. Deze op hardlopen geïnspireerde schoen omsluit de voet met een bovenwerk van gebreid textiel dat schittert met typische NMD-details.", Color = "Zwart", 
Price = 149.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/7abb75949dad481a9084a9740116d6d8_9366/NMD_R1_Schoenen_zwart_BD7745_07_standard.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 57 , Name = "Adidas EQT",    //#
Description = "", Color = "Wit", 
Price = 89.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/e31254939f2d4a998cd9a91500e5298f_9366/EQT_Support_91_18_Schoenen_zwart_AQ1037_01_standard.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 58 , Name = "Adidas Ultra Boots",    //#
Description = "Voel elke stap, push jezelf en houd je absoluut niet in. Blijf doorvechten tot de finish. Deze neutrale hardloopschoenen voor heren gebruiken de energieteruggevende Boost-demping voor een krachtige afzet bij iedere voetlanding.", Color = "Grijs", 
Price = 89.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/7102f1385cea40d69878a80f009bb34c_9366/Ultraboost_Schoenen_grijs_BB6167_01_standard.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 59, Name = "Puma Clyde Court Peace",    //#
Description = "PUMA Hoops heeft voor jou het nieuwste in de Clyde Court-collectie: the Clyde Court Peace on Earth. Deze versie haalt zijn inspiratie uit het kerstseizoen en de hoop voor vrede op aarde. ", Color = "Grijs", 
Price = 119.95M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/191896/01/fnd/EEA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 60, Name = "Puma Ignite",    //#
Description = "In de IGNITE Limitless Knit zijn zeer technische hardloopvoorzieningen gecombineerd met de designmentaliteit en -attitude van moderne straatkleding. Dit model biedt een hoogwaardige demping en een goed energierendement met IGNITE-schuim over de volledige lengte van de tussenzool.", Color = "Zwart", 
Price = 119.95M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/189987/02/fnd/EEA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 61, Name = "Puma Suede",    //#
Description = "Deze versie van de Suede geeft een draai aan PUMA's bekendste model en heeft alle kenmerken van de iconische versie, zoals de bekende dunne tooling en PUMA Formstrip aan de zijkant, maar heeft daarbij strakke monochrome lijnen voor een extra modieuze street-look.", Color = "Wit", 
Price = 119.95M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/366287/01/fnd/EEA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 62 , Name = "Timberland Premium 6-Inch",    //#
Description = "Een stoere klassieker met ongelooflijk comfort - na 40 jaar is onze iconische 6-inch Timberland®-boot nog steeds een klassieker die staat voor waar vakmanschap.", Color = "Bruin", 
Price = 219.95M, ProductSizeId = 3, Amount = 20, ImageName="https://images.timberland.com/is/image/TimberlandEU/10061713-alt1?$VFDP-VIEWER-ZOOMVIEW-HERO$&id=V44RN3&wid=773&hei=773&fmt=jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 63 , Name = "Timberland Premium 6-Inch",    //#
Description = "Een stoere klassieker met ongelooflijk comfort - na 40 jaar is onze iconische 6-inch Timberland®-boot nog steeds een klassieker die staat voor waar vakmanschap.", Color = "Beige", 
Price = 219.95M, ProductSizeId = 3, Amount = 20, ImageName="https://images.timberland.com/is/image/TimberlandEU/A1BBLE82-alt1?$VFDP-VIEWER-ZOOMVIEW-HERO$&id=salRB2&wid=773&hei=773&fmt=jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 64 , Name = "Reebok Classic",    //#
Description = "Je hoort er helemaal bij in deze nieuwe uitvoering van onze klassieke Club C schoen. Het bovenwerk van zacht leer zorgt voor superieure ondersteuning en kwaliteit.", Color = "Wit", 
Price = 79.95M, ProductSizeId = 3, Amount = 20, ImageName="https://www.reebok.nl/dis/dw/image/v2/AAJP_PRD/on/demandware.static/-/Sites-reebok-products/default/dw32abaa19/zoom/AR0459_01_standard.jpg?sh=840&strip=false&sw=840"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 65 , Name = "Reebok Crossfit Nano",    //#
Description = "Performance, duurzaamheid en comfort komen samen in deze uitvoering van de Nano-trainingsschoen.", Color = "Zwart", 
Price = 119.95M, ProductSizeId = 3, Amount = 20, ImageName="https://www.reebok.nl/dis/dw/image/v2/AAJP_PRD/on/demandware.static/-/Sites-reebok-products/default/dw8d26ba35/zoom/M43438_01_standard.jpg?sh=840&strip=false&sw=840"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 66 , Name = "Reebok Classic Leather",    //#
Description = "Blijf altijd bij de tijd. Het bovenwerk van zacht leer geeft je superieur comfort. De gesneden EVA-middenzool biedt lichte schokdemping. De gevormde PU-inlegzool biedt comfort en duurzaamheid.", Color = "Zwart", 
Price = 89.95M, ProductSizeId = 3, Amount = 20, ImageName="https://www.reebok.nl/dis/dw/image/v2/AAJP_PRD/on/demandware.static/-/Sites-reebok-products/default/dwd74ccae0/zoom/2267_01_standard.jpg?sh=2000&strip=false&sw=2000"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 67 , Name = "Vans Sk8-Hi Schoenen",    //#
Description = "De Vans Sk8-Hi is een lichte, hoge veterschoen. De gevoerde hiel zorgt voor extra comfort, de verstevigde neus kan tegen een stootje en de gevoerde boorden staan garant voor steun en een flexibel draagcomfort.", Color = "Zwart", 
Price = 84.95M, ProductSizeId = 3, Amount = 20, ImageName="https://images.vans.com/is/image/VansEU/VN000D5IB8C-HERO?$VFDP-VIEWER-ZOOMVIEW-HERO$&id=zcvR13&wid=840&hei=840&fmt=jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 68 , Name = "Vans Old Skool",    //#
Description = "De Old Skool-schoen is een echte Vans-klassieker; een lage veterschoen die als eerste de iconische zijstreep droeg. De schoen is gevoerd, heeft gevoerde boorden voor steun en flexibiliteit en de verstevigde neus kan tegen een stootje.", Color = "Blauw", 
Price = 84.95M, ProductSizeId = 3, Amount = 20, ImageName="https://images.vans.com/is/image/VansEU/VN000D3HY28-HERO?$VFDP-VIEWER-ZOOMVIEW-HERO$&id=fgRQN2&wid=840&hei=840&fmt=jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 69 , Name = "Vans Checkerboard",    //#
Description = "De Vans Classic Slip-On is een lage instapper met elastiek aan de zijkanten en gevoerde boorden voor extra comfort. De schoen is voorzien van het Vans-vlaglogo en de kenmerkende wafelprofielzool staat garant voor een stevige grip.", Color = "Wit", 
Price = 64.99M, ProductSizeId = 3, Amount = 20, ImageName="https://images.vans.com/is/image/VansEU/VN000EYEBWW-HERO?$VFDP-VIEWER-ZOOMVIEW-HERO$&id=1ucRN2&wid=840&hei=840&fmt=jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 70 , Name = "Adidas Stripes T-Shirt",    //#
Description = "De archief-look van dit T-shirt vangt het gemak dat Italiaanse sportkleding in de jaren 80 uitstraalde. Karakteristieke 3-Stripes zijn in het historische design ingebreid. Het zachte T-shirt van mesh heeft een verfijnde, hoog opstaande kraag.", Color = "Zwart", 
Price = 44.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/45e6916b26714329aef5a944011a45df_9366/Stripes_T-shirt_blauw_DU7847_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 71 , Name = "Adidas Essential T-Shirt",    //#
Description = "Een onmisbaar item voor elke dag. Dit T-shirt heeft een strakke look met een geborduurd Trefoil-logo op de borst. Door de katoenen jersey voelt 't shirt zacht en comfortabel aan.", Color = "Grijs", 
Price = 24.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/e1ce80435eeb4501bd81a98f014ab60a_9366/Essential_T-shirt_grijs_DV1641_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 72 , Name = "Adidas Thaxter T-shirt",    //#
Description = "Jiro Bevis behoort zowat tot het meubilair van de Londense kunstwereld. Hij geeft het Trefoil-logo een frisse draai, met dit gedurfde T-shirt als resultaat. Het shirt van zachte, katoenen jersey heeft een casual recht silhouet.", Color = "Zwart", 
Price = 32.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/a361611d72334203af82a99a0155142b_9366/Thaxter_T-shirt_zwart_DU8367_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 73 , Name = "Nike Club T-Shirt",    //#
Description = "Een onmisbaar item voor elke dag. Dit T-shirt heeft een strakke look met een geborduurd logo op de borst.", Color = "Geel", 
Price = 29.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic04.ztat.net/vgs/media/packshot/pdp-zoom/NI/12/2O/0C/EE/11/NI122O0CE-E11@2.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 74 , Name = "Nike Sport T-Shirt",    //#
Description = "Een onmisbaar item voor elke dag. Dit T-shirt heeft een strakke look met een geborduurd logo op de borst.", Color = "Wit", 
Price = 19.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic04.ztat.net/vgs/media/packshot/pdp-zoom/NI/12/2O/0C/MA/11/NI122O0CM-A11@7.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 75 , Name = "Nike Brand T-Shirt",    //#
Description = "Een onmisbaar item voor elke dag. Dit T-shirt heeft een strakke look met een geborduurd logo op de borst.", Color = "Zwart", 
Price = 24.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic04.ztat.net/vgs/media/packshot/pdp-zoom/NI/12/2O/0C/WK/11/NI122O0CW-K11@9.2.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 76 , Name = "Puma x XO T-Shirt",    //#
Description = "De PUMA x XO-samenwerking is er gekomen met dank aan de Canadese hiphopper The Weeknd en is een heruitvinden van de streetwear uit de jaren.", Color = "Zwart", 
Price = 29.95M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/578538/01/fnd/EEA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 77 , Name = "Puma Camo T-Shirt",    //#
Description = "ATELIER NEW REGIME is het helemaal. Ze staan bekend om hun moderne ontwerpen waarin de Frans-Engelse culturele samensmelting is verwerkt die hun favoriete basis is.", Color = "Groen", 
Price = 29.95M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/576564/02/fnd/EEA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 78 , Name = "Puma T-Shirt",    //#
Description = "Deze opvallende, gladde, sportieve top met korte mouwen van zachte katoenen jersey heeft gestreepte boordjes langs de hals en mouwen.", Color = "Rood", 
Price = 19.95M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/845134/01/fnd/EEA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 79 , Name = "Reebok Logo T-Shirt",    //#
Description = "Maak je look voor elke dag af met een klassiek heren-T-shirt. Het zachte katoen ademt van nature. ", Color = "Groen", 
Price = 19.95M, ProductSizeId = 3, Amount = 20, ImageName="https://www.reebok.nl/dis/dw/image/v2/AAJP_PRD/on/demandware.static/-/Sites-reebok-products/default/dw62960709/zoom/DU4688_01_standard.jpg?sh=840&strip=false&sw=840"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 80 , Name = "Reebok Classics T-shirt",    //#
Description = "Vier de geschiedenis van Reebok. Dit gemakkelijk te dragen T-shirt pronkt met een opvallend Vector-logo midden op de voorkant.", Color = "Zwart", 
Price = 39.95M, ProductSizeId = 3, Amount = 20, ImageName="https://www.reebok.nl/dis/dw/image/v2/AAJP_PRD/on/demandware.static/-/Sites-reebok-products/default/dw03b16d0c/zoom/DT8245_01_standard.jpg?sh=840&strip=false&sw=840"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 81 , Name = "Vans Classic T-shirt",    //#
Description = "Het Vans Classic T-shirt heeft een ronde hals en korte mouwen, met kenmerkende Vans-logo-opdrukken op de voorkant en een klassieke pasvorm.", Color = "Groen", 
Price = 19.95M, ProductSizeId = 3, Amount = 20, ImageName="https://images.vans.com/is/image/VansEU/V00GGGRQI-ALT9?$VFDP-VIEWER-ZOOMVIEW-HERO$&id=npnQ_2&wid=1043&hei=1044&fmt=jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 82 , Name = "Vans Classic Raglan",    //#
Description = "De Vans Classic Raglan heeft een ronde hals en driekwartraglanmouwen in contrastkleuren. Op de voorkant prijkt het Vans-logo.", Color = "Wit", 
Price = 34.95M, ProductSizeId = 3, Amount = 20, ImageName="https://images.vans.com/is/image/VansEU/VN0002QQWV5-ALT9?$VFDP-VIEWER-ZOOMVIEW-HERO$&id=CagRl0&wid=1043&hei=1044&fmt=jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 83 , Name = "Slim Fit Jeans",    //#
Description = "", Color = "Blauw", 
Price = 69.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/RE/32/2G/09/IK/11/RE322G09I-K11@8.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 84 , Name = "Zwarte Katoen Jeans",    //#
Description = "", Color = "Zwart", 
Price = 59.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic04.ztat.net/vgs/media/packshot/pdp-zoom/GS/12/2G/0D/QQ/11/GS122G0DQ-Q11@12.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 85 , Name = "Gescheurde Jeans",    //#
Description = "", Color = "Blauw", 
Price = 69.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic04.ztat.net/vgs/media/packshot/pdp-zoom/SI/F2/2G/00/RK/11/SIF22G00R-K11@8.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 86 , Name = "Gescheurde Slim Fit Jeans ",    //#
Description = "", Color = "Blauw", 
Price = 79.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/OS/32/2G/08/RK/11/OS322G08R-K11@18.1.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 87 , Name = "Black Spotted Jeans",    //#
Description = "", Color = "Zwart", 
Price = 79.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic04.ztat.net/vgs/media/packshot/pdp-zoom/C7/42/2G/00/AQ/11/C7422G00A-Q11@12.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 88 , Name = "Grijze Skinny Fit",    //#
Description = "", Color = "Grijs", 
Price = 69.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic04.ztat.net/vgs/media/packshot/pdp-zoom/C7/42/2G/00/3Q/11/C7422G003-Q11@12.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 89 , Name = "Grijze Biker Jeans",    //#
Description = "", Color = "Grijs", 
Price = 79.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/BO/H2/2G/00/KC/11/BOH22G00K-C11@12.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 90 , Name = "Adidas Off Court Hoodie",    //#
Description = "Design uit het archief, vernieuwd voor nu. Deze hoodie valt op met geribbelde boorden en een subtiele, geborduurde Trefoil op de borst. ", Color = "Wit", 
Price = 79.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/5f79814d0aa04ac2bf6aa931012aa9d5_9366/Off_Court_Hoodie_grijs_DV3255_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 91 , Name = "Adidas Team Tech Hoodie",    //#
Description = "Buiten in de natuur zijn laagjes de sleutel tot een hele dag lang comfort. Dit sweatshirt blijft trouw aan het design van een klassieke hoodie, maar rust 'm uit voor onvoorspelbaar weer.", Color = "Zwart", 
Price = 69.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/5532dd7b650b4161b864a9180115bee7_9366/Team_Tech_Hoodie_zwart_CY8142_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 92 , Name = "Adidas All Blacks Hoodie",    //#
Description = "Deze hoodie met rugbystijl brengt een eerbetoon aan de allesoverwinnende All Blacks. De sweater is gemaakt van zachte French terry badstof en pronkt met de beroemde zilveren varen.", Color = "Zwart", 
Price = 54.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/ac5fc274f7f4441c9cc0a88e00b18520_9366/All_Blacks_Hoodie_zwart_CW3116_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 93 , Name = "Nike Camo Hoodie",    //#
Description = "Mooie Nike Hoodie", Color = "Groen", 
Price = 67.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic04.ztat.net/vgs/media/packshot/pdp-zoom/NI/12/2S/09/9G/11/NI122S099-G11@11.1.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 94 , Name = "Nike SB Hoodie",    //#
Description = "Mooie Nike Hoodie", Color = "Rood", 
Price = 69.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic04.ztat.net/vgs/media/packshot/pdp-zoom/NS/42/2S/01/GG/11/NS422S01G-G11@13.1.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 95 , Name = "Nike Box Hoodie",    //#
Description = "Mooie Nike Hoodie", Color = "Grijs", 
Price = 49.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/NI/12/2S/08/NN/11/NI122S08N-N11@12.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 96 , Name = "Puma Geruite Hoodie",    //#
Description = "PUMA's reputatie van innovatieve en altijd comfortabele street style zet door met deze extra warme geruite hoodie van polaire fleece.", Color = "Rood", 
Price = 79.95M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/578984/18/fnd/EEA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 97 , Name = "Puma Evolution Hoodie",    //#
Description = "Deze PUMA Eva sweater van katoenmix met capuchon heeft een modieuze stijl, strakke sportieve look en superzacht comfort.", Color = "Zwart", 
Price = 69.95M, ProductSizeId = 3, Amount = 20, ImageName="https://pumaimages.azureedge.net/images/579702/03/fnd/EEA/h/600/w/600"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 98 , Name = "Reebok Tape Hoodie",    //#
Description = "Een retro look voor je hoodieverzameling. Deze beproefde stijl laat zijn geschiedenis zien. Dit herensweatshirt heeft grafische tape langs de mouwen en het Starcrest-logo op de borst.", Color = "Geel", 
Price = 69.95M, ProductSizeId = 3, Amount = 20, ImageName="https://www.reebok.nl/dis/dw/image/v2/AAJP_PRD/on/demandware.static/-/Sites-reebok-products/default/dw2038752d/zoom/DT8155_01_standard.jpg?sh=840&strip=false&sw=840"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 99 , Name = "Adidas Camo vest",    //#
Description = "Stukken met camouflageprint maken deze streetwear-basic extra edgy. Voor een zacht en comfortabel gevoel is de hoodie gemaakt van katoenen French terry badstof.", Color = "Groen", 
Price = 79.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/404cbde04ee64564aaa9a97b013b409d_9366/Camouflage_Hoodie_zwart_DV2019_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 100 , Name = "Adidas Sport Vest",    //#
Description = "Deze herenhoodie is gemaakt van zachte French terry badstof met katoen om je behaaglijk en comfortabel te houden.", Color = "Grijs", 
Price = 59.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/5d1ba0e117f345e99212a81000bba68a_9366/Essentials_3-Stripes_Hoodie_grijs_S98788_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 101, Name = "Adidas Outline Hoodie",    //#
Description = "Adicolor staat al sinds 1983 voor creativiteit en zelfexpressie. Deze hoodie houdt de Adicolor-look levend. Het comfortabele, relaxte model is gemaakt van geweven polyester.", Color = "Groen", 
Price = 59.95M, ProductSizeId = 3, Amount = 20, ImageName="https://assets.adidas.com/images/w_840,h_840,f_auto,q_90,fl_lossy/4354bf68b1a54ddba625a9a800f2c682_9366/Outline_Hoodie_blauw_DX3855_01_laydown.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 102 , Name = "Nike Tech Vest",    //#
Description = "Mooie Nike Vest", Color = "Zwart", 
Price = 89.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/NI/12/2S/08/BK/11/NI122S08B-K11@12.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 103 , Name = "Nike Club Vest",    //#
Description = "Mooie Nike Vest", Color = "Grijs", 
Price = 49.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic04.ztat.net/vgs/media/packshot/pdp-zoom/NI/12/2S/05/8C/11/NI122S058-C11@12.jpg"});

modelBuilder.Entity<Product>().HasData(new Product{Id = 104 , Name = "Nike Sport Vest",    //#
Description = "Mooie Nike Vest", Color = "Grijs", 
Price = 49.95M, ProductSizeId = 3, Amount = 20, ImageName="https://mosaic03.ztat.net/vgs/media/packshot/pdp-zoom/NI/12/2S/08/PC/11/NI122S08P-C11@4.jpg"});


    modelBuilder.Entity<ProductCategory>().HasData(
        new {Id = 1, ProductId = 1, CategoryId = 1},
        new {Id = 2, ProductId = 1, CategoryId = 3},
        new {Id = 3, ProductId = 1, CategoryId = 8},

        new {Id = 4, ProductId = 2, CategoryId = 1},
        new {Id = 5, ProductId = 2, CategoryId = 3},
        new {Id = 6, ProductId = 2, CategoryId = 8},

        new {Id = 7, ProductId = 3, CategoryId = 1},
        new {Id = 8, ProductId = 3, CategoryId = 3},
        new {Id = 9, ProductId = 3, CategoryId = 8},
    // Dames - Schoenen - Adidas

    // Dames - Schoenen - Nike
        new {Id = 10, ProductId = 4, CategoryId = 1},
        new {Id = 11, ProductId = 4, CategoryId = 3},
        new {Id = 12, ProductId = 4, CategoryId = 9},

        new {Id = 13, ProductId = 5, CategoryId = 1},
        new {Id = 14, ProductId = 5, CategoryId = 3},
        new {Id = 15, ProductId = 5, CategoryId = 9},

        new {Id = 16, ProductId = 6, CategoryId = 1},
        new {Id = 17, ProductId = 6, CategoryId = 3},
        new {Id = 18, ProductId = 6, CategoryId = 9},
    // Dames - Schoenen - Nike

    // Dames - Schoenen - Puma
        new {Id = 19, ProductId = 7, CategoryId = 1},
        new {Id = 20, ProductId = 7, CategoryId = 3},
        new {Id = 21, ProductId = 7, CategoryId = 11},

        new {Id = 22, ProductId = 8, CategoryId = 1},
        new {Id = 23, ProductId = 8, CategoryId = 3},
        new {Id = 24, ProductId = 8, CategoryId = 11},

        new {Id = 25, ProductId = 9, CategoryId = 1},
        new {Id = 26, ProductId = 9, CategoryId = 3},
        new {Id = 27, ProductId = 9, CategoryId = 11},
    // Dames - Schoenen - Puma

    // Dames - Schoenen - Timberland
        new {Id = 28, ProductId = 10, CategoryId = 1},
        new {Id = 29, ProductId = 10, CategoryId = 3},
        new {Id = 30, ProductId = 10, CategoryId = 12},

        new {Id = 31, ProductId = 11, CategoryId = 1},
        new {Id = 32, ProductId = 11, CategoryId = 3},
        new {Id = 33, ProductId = 11, CategoryId = 12},
    // Dames - Schoenen - Timberland

    // Dames - Schoenen - Reebok
        new {Id = 34, ProductId = 12, CategoryId = 1},
        new {Id = 35, ProductId = 12, CategoryId = 3},
        new {Id = 36, ProductId = 12, CategoryId = 13},

        new {Id = 37, ProductId = 13, CategoryId = 1},
        new {Id = 38, ProductId = 13, CategoryId = 3},
        new {Id = 39, ProductId = 13, CategoryId = 13},
    // Dames - Schoenen - Reebok

    // Dames - Schoenen - Vans
        new {Id = 40, ProductId = 14, CategoryId = 1},
        new {Id = 41, ProductId = 14, CategoryId = 3},
        new {Id = 42, ProductId = 14, CategoryId = 14},

        new {Id = 43, ProductId = 15, CategoryId = 1},
        new {Id = 44, ProductId = 15, CategoryId = 3},
        new {Id = 45, ProductId = 15, CategoryId = 14},
    // Dames - Schoenen - Reebok

    // Dames - Shirts - Adidas
        new {Id = 46, ProductId = 16, CategoryId = 1},
        new {Id = 47, ProductId = 16, CategoryId = 4},
        new {Id = 48, ProductId = 16, CategoryId = 8},

        new {Id = 49, ProductId = 17, CategoryId = 1},
        new {Id = 50, ProductId = 17, CategoryId = 4},
        new {Id = 51, ProductId = 17, CategoryId = 8},

        new {Id = 52, ProductId = 18, CategoryId = 1},
        new {Id = 53, ProductId = 18, CategoryId = 4},
        new {Id = 54, ProductId = 18, CategoryId = 8},
    // Dames - Shirts - Adidas

    // Dames - Shirts - Nike
        new {Id = 55, ProductId = 19, CategoryId = 1},
        new {Id = 56, ProductId = 19, CategoryId = 4},
        new {Id = 57, ProductId = 19, CategoryId = 9},

        new {Id = 58, ProductId = 20, CategoryId = 1},
        new {Id = 59, ProductId = 20, CategoryId = 4},
        new {Id = 60, ProductId = 20, CategoryId = 9},
        
        new {Id = 61, ProductId = 21, CategoryId = 1},
        new {Id = 62, ProductId = 21, CategoryId = 4},
        new {Id = 63, ProductId = 21, CategoryId = 9},

    // Dames - Shirts - Nike

    // Dames - Shirts - Puma
        new {Id = 64, ProductId = 22, CategoryId = 1},
        new {Id = 65, ProductId = 22, CategoryId = 4},
        new {Id = 66, ProductId = 22, CategoryId = 11},

        new {Id = 67, ProductId = 23, CategoryId = 1},
        new {Id = 68, ProductId = 23, CategoryId = 4},
        new {Id = 69, ProductId = 23, CategoryId = 11},

        new {Id = 70, ProductId = 24, CategoryId = 1},
        new {Id = 71, ProductId = 24, CategoryId = 4},
        new {Id = 72, ProductId = 24, CategoryId = 11},
    // Dames - Shirts - Puma

    // Dames - Shirts - Reebok
        new {Id = 73, ProductId = 25, CategoryId = 1},
        new {Id = 74, ProductId = 25, CategoryId = 4},
        new {Id = 75, ProductId = 25, CategoryId = 13},

        new {Id = 76, ProductId = 26, CategoryId = 1},
        new {Id = 77, ProductId = 26, CategoryId = 4},
        new {Id = 78, ProductId = 26, CategoryId = 13},
    // Dames - Shirts - Reebok

    // Dames - Shirts - Vans
        new {Id = 79, ProductId = 27, CategoryId = 1},
        new {Id = 80, ProductId = 27, CategoryId = 4},
        new {Id = 81, ProductId = 27, CategoryId = 14},

        new {Id = 82, ProductId = 28, CategoryId = 1},
        new {Id = 83, ProductId = 28, CategoryId = 4},
        new {Id = 84, ProductId = 28, CategoryId = 14},
    // Dames - Shirts - Vans

    // Dames - Jeans - HRFashion
        new {Id = 85, ProductId = 29, CategoryId = 1},
        new {Id = 86, ProductId = 29, CategoryId = 5},
        new {Id = 87, ProductId = 29, CategoryId = 10},

        new {Id = 88, ProductId = 30, CategoryId = 1},
        new {Id = 89, ProductId = 30, CategoryId = 5},
        new {Id = 90, ProductId = 30, CategoryId = 10},

        new {Id = 91, ProductId = 31, CategoryId = 1},
        new {Id = 92, ProductId = 31, CategoryId = 5},
        new {Id = 93, ProductId = 31, CategoryId = 10},

        new {Id = 94, ProductId = 32, CategoryId = 1},
        new {Id = 95, ProductId = 32, CategoryId = 5},
        new {Id = 96, ProductId = 32, CategoryId = 10},

        new {Id = 97, ProductId = 33, CategoryId = 1},
        new {Id = 98, ProductId = 33, CategoryId = 5},
        new {Id = 99, ProductId = 33, CategoryId = 10},

        new {Id = 100, ProductId = 34, CategoryId = 1},
        new {Id = 101, ProductId = 34, CategoryId = 5},
        new {Id = 102, ProductId = 34, CategoryId = 10},

        new {Id = 103, ProductId = 35, CategoryId = 1},
        new {Id = 104, ProductId = 35, CategoryId = 5},
        new {Id = 105, ProductId = 35, CategoryId = 10},

        new {Id = 106, ProductId = 36, CategoryId = 1},
        new {Id = 107, ProductId = 36, CategoryId = 5},
        new {Id = 108, ProductId = 36, CategoryId = 10},
    // Dames - Jeans - HRFashion

    // Dames - Hoodies - Adidas
        new {Id = 109, ProductId = 37, CategoryId = 1},
        new {Id = 110, ProductId = 37, CategoryId = 6},
        new {Id = 111, ProductId = 37, CategoryId = 8},

        new {Id = 112, ProductId = 38, CategoryId = 1},
        new {Id = 113, ProductId = 38, CategoryId = 6},
        new {Id = 114, ProductId = 38, CategoryId = 8},

        new {Id = 115, ProductId = 39, CategoryId = 1},
        new {Id = 116, ProductId = 39, CategoryId = 6},
        new {Id = 117, ProductId = 39, CategoryId = 8},
    // Dames - Hoodies - Adidas

    // Dames - Hoodies - Nike
        new {Id = 118, ProductId = 40, CategoryId = 1},
        new {Id = 119, ProductId = 40, CategoryId = 6},
        new {Id = 120, ProductId = 40, CategoryId = 9},

        new {Id = 121, ProductId = 41, CategoryId = 1},
        new {Id = 122, ProductId = 41, CategoryId = 6},
        new {Id = 123, ProductId = 41, CategoryId = 9},

        new {Id = 124, ProductId = 42, CategoryId = 1},
        new {Id = 125, ProductId = 42, CategoryId = 6},
        new {Id = 126, ProductId = 42, CategoryId = 9},
    // Dames - Hoodies - Nike

    // Dames - Hoodies - Puma
        new {Id = 127, ProductId = 43, CategoryId = 1},
        new {Id = 128, ProductId = 43, CategoryId = 6},
        new {Id = 129, ProductId = 43, CategoryId = 11},

        new {Id = 130, ProductId = 44, CategoryId = 1},
        new {Id = 131, ProductId = 44, CategoryId = 6},
        new {Id = 132, ProductId = 44, CategoryId = 11},

        new {Id = 133, ProductId = 45, CategoryId = 1},
        new {Id = 134, ProductId = 45, CategoryId = 6},
        new {Id = 135, ProductId = 45, CategoryId = 11},
    // Dames - Hoodies - Puma

    // Dames - Hoodies - Reebok
        new {Id = 136, ProductId = 46, CategoryId = 1},
        new {Id = 137, ProductId = 46, CategoryId = 6},
        new {Id = 138, ProductId = 46, CategoryId = 13},
    // Dames - Hoodies - Reebok

    // Dames - Vesten - Adidas
        new {Id = 139, ProductId = 47, CategoryId = 1},
        new {Id = 140, ProductId = 47, CategoryId = 7},
        new {Id = 141, ProductId = 47, CategoryId = 8},

        new {Id = 142, ProductId = 48, CategoryId = 1},
        new {Id = 143, ProductId = 48, CategoryId = 7},
        new {Id = 144, ProductId = 48, CategoryId = 8},

        new {Id = 145, ProductId = 49, CategoryId = 1},
        new {Id = 146, ProductId = 49, CategoryId = 7},
        new {Id = 147, ProductId = 49, CategoryId = 8},
    // Dames - Vesten - Adidas

    // Dames - Vesten - Nike
        new {Id = 148, ProductId = 50, CategoryId = 1},
        new {Id = 149, ProductId = 50, CategoryId = 6},
        new {Id = 150, ProductId = 50, CategoryId = 9},

        new {Id = 151, ProductId = 51, CategoryId = 1},
        new {Id = 152, ProductId = 51, CategoryId = 6},
        new {Id = 153, ProductId = 51, CategoryId = 9},
    // Dames - Vesten - Nike

    // Dames - Vesten - Reebok
        new {Id = 154, ProductId = 52, CategoryId = 1},
        new {Id = 155, ProductId = 52, CategoryId = 7},
        new {Id = 156, ProductId = 52, CategoryId = 13},
    // Dames - Vesten - Reebok

    // Mannen //

    // Mannen - Schoenen - Nike
        new {Id = 157, ProductId = 53, CategoryId = 2},
        new {Id = 158, ProductId = 53, CategoryId = 3},
        new {Id = 159, ProductId = 53, CategoryId = 9},

        new {Id = 160, ProductId = 54, CategoryId = 2},
        new {Id = 161, ProductId = 54, CategoryId = 3},
        new {Id = 162, ProductId = 54, CategoryId = 9},

        new {Id = 163, ProductId = 55, CategoryId = 2},
        new {Id = 164, ProductId = 55, CategoryId = 3},
        new {Id = 165, ProductId = 55, CategoryId = 9},
    // Mannen - Schoenen - Nike

    // Mannen - Schoenen - Adidas
        new {Id = 166, ProductId = 56, CategoryId = 2},
        new {Id = 167, ProductId = 56, CategoryId = 3},
        new {Id = 168, ProductId = 56, CategoryId = 8},

        new {Id = 169, ProductId = 57, CategoryId = 2},
        new {Id = 170, ProductId = 57, CategoryId = 3},
        new {Id = 171, ProductId = 57, CategoryId = 8},

        new {Id = 172, ProductId = 58, CategoryId = 2},
        new {Id = 173, ProductId = 58, CategoryId = 3},
        new {Id = 174, ProductId = 58, CategoryId = 8},
    // Mannen - Schoenen - Adidas

    // Mannen - Schoenen - Puma
        new {Id = 175, ProductId = 59, CategoryId = 2},
        new {Id = 176, ProductId = 59, CategoryId = 3},
        new {Id = 177, ProductId = 59, CategoryId = 11},

        new {Id = 178, ProductId = 60, CategoryId = 2},
        new {Id = 179, ProductId = 60, CategoryId = 3},
        new {Id = 180, ProductId = 60, CategoryId = 11},

        new {Id = 181, ProductId = 61, CategoryId = 2},
        new {Id = 182, ProductId = 61, CategoryId = 3},
        new {Id = 183, ProductId = 61, CategoryId = 11},
    // Mannen - Schoenen - Puma

    // Mannen - Schoenen - Timberland
        new {Id = 184, ProductId = 62, CategoryId = 2},
        new {Id = 185, ProductId = 62, CategoryId = 3},
        new {Id = 186, ProductId = 62, CategoryId = 12},

        new {Id = 187, ProductId = 63, CategoryId = 2},
        new {Id = 188, ProductId = 63, CategoryId = 3},
        new {Id = 189, ProductId = 63, CategoryId = 12},
    // Mannen - Schoenen - Timberland

    // Mannen - Schoenen - Reebok
        new {Id = 190, ProductId = 64, CategoryId = 2},
        new {Id = 191, ProductId = 64, CategoryId = 3},
        new {Id = 192, ProductId = 64, CategoryId = 13},

        new {Id = 193, ProductId = 65, CategoryId = 2},
        new {Id = 194, ProductId = 65, CategoryId = 3},
        new {Id = 195, ProductId = 65, CategoryId = 13},

        new {Id = 196, ProductId = 66, CategoryId = 2},
        new {Id = 197, ProductId = 66, CategoryId = 3},
        new {Id = 198, ProductId = 66, CategoryId = 13},
    // Mannen - Schoenen - Reebok

    // Mannen - Schoenen - Vans
        new {Id = 199, ProductId = 67, CategoryId = 2},
        new {Id = 200, ProductId = 67, CategoryId = 3},
        new {Id = 201, ProductId = 67, CategoryId = 14},

        new {Id = 202, ProductId = 68, CategoryId = 2},
        new {Id = 203, ProductId = 68, CategoryId = 3},
        new {Id = 204, ProductId = 68, CategoryId = 14},

        new {Id = 205, ProductId = 69, CategoryId = 2},
        new {Id = 206, ProductId = 69, CategoryId = 3},
        new {Id = 207, ProductId = 69, CategoryId = 14},
    // Mannen - Schoenen - Vans

    // Mannen - Shirts - Adidas
        new {Id = 208, ProductId = 70, CategoryId = 2},
        new {Id = 209, ProductId = 70, CategoryId = 4},
        new {Id = 210, ProductId = 70, CategoryId = 8},

        new {Id = 211, ProductId = 71, CategoryId = 2},
        new {Id = 212, ProductId = 71, CategoryId = 4},
        new {Id = 213, ProductId = 71, CategoryId = 8},

        new {Id = 214, ProductId = 72, CategoryId = 2},
        new {Id = 215, ProductId = 72, CategoryId = 4},
        new {Id = 216, ProductId = 72, CategoryId = 8},
    // Mannen - Shirts - Adidas

    // Mannen - Shirts - Nike
        new {Id = 217, ProductId = 73, CategoryId = 2},
        new {Id = 218, ProductId = 73, CategoryId = 4},
        new {Id = 219, ProductId = 73, CategoryId = 9},

        new {Id = 220, ProductId = 74, CategoryId = 2},
        new {Id = 221, ProductId = 74, CategoryId = 4},
        new {Id = 222, ProductId = 74, CategoryId = 9},

        new {Id = 223, ProductId = 75, CategoryId = 2},
        new {Id = 224, ProductId = 75, CategoryId = 4},
        new {Id = 225, ProductId = 75, CategoryId = 9},
    // Mannen - Shirts - Nike

    // Mannen - Shirts - Puma
        new {Id = 226, ProductId = 76, CategoryId = 2},
        new {Id = 227, ProductId = 76, CategoryId = 4},
        new {Id = 228, ProductId = 76, CategoryId = 11},

        new {Id = 229, ProductId = 77, CategoryId = 2},
        new {Id = 230, ProductId = 77, CategoryId = 4},
        new {Id = 231, ProductId = 77, CategoryId = 11},

        new {Id = 232, ProductId = 78, CategoryId = 2},
        new {Id = 233, ProductId = 78, CategoryId = 4},
        new {Id = 234, ProductId = 78, CategoryId = 11},
    // Mannen - Shirts - Puma

    // Mannen - Shirts - Reebok
        new {Id = 235, ProductId = 79, CategoryId = 2},
        new {Id = 236, ProductId = 79, CategoryId = 4},
        new {Id = 237, ProductId = 79, CategoryId = 13},

        new {Id = 238, ProductId = 80, CategoryId = 2},
        new {Id = 239, ProductId = 80, CategoryId = 4},
        new {Id = 240, ProductId = 80, CategoryId = 13},
    // Mannen - Shirts - Reebok

    // Mannen - Shirts - Vans
        new {Id = 241, ProductId = 81, CategoryId = 2},
        new {Id = 242, ProductId = 81, CategoryId = 4},
        new {Id = 243, ProductId = 81, CategoryId = 14},

        new {Id = 244, ProductId = 82, CategoryId = 2},
        new {Id = 245, ProductId = 82, CategoryId = 4},
        new {Id = 246, ProductId = 82, CategoryId = 14},
    // Mannen - Shirts - Vans

    // Mannen - Jeans - HRFashion
        new {Id = 247, ProductId = 83, CategoryId = 2},
        new {Id = 248, ProductId = 83, CategoryId = 5},
        new {Id = 249, ProductId = 83, CategoryId = 10},

        new {Id = 250, ProductId = 84, CategoryId = 2},
        new {Id = 251, ProductId = 84, CategoryId = 5},
        new {Id = 252, ProductId = 84, CategoryId = 10},
        
        new {Id = 253, ProductId = 85, CategoryId = 2},
        new {Id = 254, ProductId = 85, CategoryId = 5},
        new {Id = 255, ProductId = 85, CategoryId = 10},

        new {Id = 256, ProductId = 86, CategoryId = 2},
        new {Id = 257, ProductId = 86, CategoryId = 5},
        new {Id = 258, ProductId = 86, CategoryId = 10},

        new {Id = 259, ProductId = 87, CategoryId = 2},
        new {Id = 260, ProductId = 87, CategoryId = 5},
        new {Id = 261, ProductId = 87, CategoryId = 10},

        new {Id = 262, ProductId = 88, CategoryId = 2},
        new {Id = 263, ProductId = 88, CategoryId = 5},
        new {Id = 264, ProductId = 88, CategoryId = 10},

        new {Id = 265, ProductId = 89, CategoryId = 2},
        new {Id = 266, ProductId = 89, CategoryId = 5},
        new {Id = 267, ProductId = 89, CategoryId = 10},       
    // Mannen - Jeans - HRFashion

    // Mannen - Hoodies - Adidas
        new {Id = 268, ProductId = 90, CategoryId = 2},
        new {Id = 269, ProductId = 90, CategoryId = 6},
        new {Id = 270, ProductId = 90, CategoryId = 8},

        new {Id = 271, ProductId = 91, CategoryId = 2},
        new {Id = 272, ProductId = 91, CategoryId = 6},
        new {Id = 273, ProductId = 91, CategoryId = 8},

        new {Id = 274, ProductId = 92, CategoryId = 2},
        new {Id = 275, ProductId = 92, CategoryId = 6},
        new {Id = 276, ProductId = 92, CategoryId = 8},
    // Mannen - Hoodies - Adidas

    // Mannen - Hoodies - Nike
        new {Id = 277, ProductId = 93, CategoryId = 2},
        new {Id = 278, ProductId = 93, CategoryId = 6},
        new {Id = 279, ProductId = 93, CategoryId = 9},

        new {Id = 280, ProductId = 94, CategoryId = 2},
        new {Id = 281, ProductId = 94, CategoryId = 6},
        new {Id = 282, ProductId = 94, CategoryId = 9},

        new {Id = 283, ProductId = 95, CategoryId = 2},
        new {Id = 284, ProductId = 95, CategoryId = 6},
        new {Id = 285, ProductId = 95, CategoryId = 9},
    // Mannen - Hoodies - Nike

    // Mannen - Hoodies - Puma
        new {Id = 286, ProductId = 96, CategoryId = 2},
        new {Id = 287, ProductId = 96, CategoryId = 6},
        new {Id = 288, ProductId = 96, CategoryId = 11},

        new {Id = 289, ProductId = 97, CategoryId = 2},
        new {Id = 290, ProductId = 97, CategoryId = 6},
        new {Id = 291, ProductId = 97, CategoryId = 11},
    // Mannen - Hoodies - Puma

    // Mannen - Hoodies - Reebok
        new {Id = 292, ProductId = 98, CategoryId = 2},
        new {Id = 293, ProductId = 98, CategoryId = 6},
        new {Id = 294, ProductId = 98, CategoryId = 13},
    // Mannen - Hoodies - Reebok

    // Mannen - Vesten - Adidas
        new {Id = 295, ProductId = 99, CategoryId = 2},
        new {Id = 296, ProductId = 99, CategoryId = 7},
        new {Id = 297, ProductId = 99, CategoryId = 8},

        new {Id = 298, ProductId = 100, CategoryId = 2},
        new {Id = 299, ProductId = 100, CategoryId = 7},
        new {Id = 300, ProductId = 100, CategoryId = 8},

        new {Id = 301, ProductId = 101, CategoryId = 2},
        new {Id = 302, ProductId = 101, CategoryId = 7},
        new {Id = 303, ProductId = 101, CategoryId = 8},
    // Mannen - Vesten - Adidas

    // Mannen - Vesten - Nike
        new {Id = 304, ProductId = 102, CategoryId = 2},
        new {Id = 305, ProductId = 102, CategoryId = 7},
        new {Id = 306, ProductId = 102, CategoryId = 9},

        new {Id = 307, ProductId = 103, CategoryId = 2},
        new {Id = 308, ProductId = 103, CategoryId = 7},
        new {Id = 309, ProductId = 103, CategoryId = 9},

        new {Id = 310, ProductId = 104, CategoryId = 2},
        new {Id = 311, ProductId = 104, CategoryId = 7},
        new {Id = 312, ProductId = 104, CategoryId = 9}
    // Mannen - Vesten - Nike


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


    
