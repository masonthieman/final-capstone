using System.ComponentModel.DataAnnotations;
using System.Data;

namespace GoThro.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Holes { get; set; }
        public string Address { get; set; }
        public bool IsApproved { get; set; }
        public string Zip { get; set; }
        public string City { get; set; }
        [DataType(DataType.Url)]
        public string? ImageLocation { get; set; }
        public int? UserId { get; set; }
        public UserProfile? UserProfile { get; set; }
        public int StateId { get; set; }
        public State State { get; set; }
    }
}
