namespace GoThro.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string FirebaseUserId { get; set; }
        public UserType UserType { get; set; }
        public bool IsAdmin { get { return UserType.Id == UserType.ADMIN_ID; } }
    }
}
