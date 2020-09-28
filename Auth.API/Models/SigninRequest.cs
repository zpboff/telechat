using System.ComponentModel.DataAnnotations;

namespace Auth.API.Models
{
    public class SigninRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}