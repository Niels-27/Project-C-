namespace backend.DTOs {
   public class RegisterUserDto{ // De vorm waarin een geregistreerde user wordt opgeslagen en vervolgens naar User type wordt omgezet
    
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email {get;set;}
        public string Password {get;set;}   
        public string Salt {get;set;}
        public string Ip {get;set;}
        public string Street {get;set;}
        public string StreetNumber {get;set;}
        public string ZipCode {get;set;}
        public string City {get;set;}
        public string Country {get;set;}
    }
}