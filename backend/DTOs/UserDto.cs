using System;
namespace backend.DTOs

{
 public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Email { get; set; }
        public string Token { get; set; }

        public int Rank {get;set;}
    }

    public class GuestDTO
    {
        public int UserId {get; set;}
        public int AddressId { get; set; }
        public string Email {get;set;}

    }
}