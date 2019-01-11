using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Linq.Expressions;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using backend.Models;
using backend.DTOs;
using backend.Extensions;

namespace backend.Services
{
    public interface IUserService
    {
        UserDTO AuthenticateWithToken(string email);

    }

    public class UserService : IUserService
    {       private static readonly Expression<Func<User, UserDTO>> AsUserDto = 
            x => new UserDTO
            {       
                Id = x.Id,
                Name = x.Name,
                Email = x.Email,
                Rank = x.Rank
            };
        private readonly AppSettings _appSettings;
        FashionContext _context;

        public UserService(IOptions<AppSettings> appSettings, FashionContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
            
        }

        public UserDTO AuthenticateWithToken(string email)
        {
            var user = _context.Users.Where(x => x.Email == email && x.Rank != 2).Select(AsUserDto).SingleOrDefault();
            if (user == null) // something gone wrong
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                // Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }
    }
}