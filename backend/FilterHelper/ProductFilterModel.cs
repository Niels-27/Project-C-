using System.Collections.Generic;
using System;
using backend.Models;


///// deze files zijn experimental okey///// deze files zijn experimental okey///// deze files zijn experimental okey
namespace backend.FilterHelper

{
    public class ProductFilterModel    //Wordt gebruikt wanneer je browset naar producten
    {
        public string CategoryFM {get;set;}
        public string CategoryCloth { get; set; }
        public string CategoryBrand { get; set; }
        public decimal? PriceFrom {get;set;}
        public decimal? PriceTo { get; set; }
        public string Color {get;set;}
    }
}