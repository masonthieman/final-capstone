namespace GoThro.Models
{
    public class PlayedCourse
    {
        public int Id { get; set; }
        public UserProfile UserProfile { get; set;  }
        public Course Course { get; set; }
    }
}
