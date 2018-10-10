namespace backend.DTOs

{
    public class ProductDto    //Wordt gebruikt wanneer je browset naar producten
    {
        public int Id {get;set;}
        public string Name { get; set; }
        public decimal Price { get; set; }

        public string ImageName {get;set;}
        //public float DiscountPercentage {get; set;}
        public int Amount { get; set; }

    }
    public class ProductDetailDto{ ///Wordt gebruikt wanneer je een product klikt
        public string Name { get; set; }
        public string ImageName {get;set;}
        public string Description { get; set; }
        public string Color { get; set; }
        public string SizeName {get; set;}
        public decimal Price { get; set; }
        //public float DiscountPercentage {get; set;}
        public int Amount { get; set; }
        
    }


}