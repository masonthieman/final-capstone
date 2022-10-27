using System.ComponentModel.DataAnnotations;

namespace GoThro.Models
{
    public class UserType
    {
        public int Id { get; set; }
        
        [MaxLength(20)]
        public string Name { get; set; }

        public static int ADMIN_ID => 1;
        public static int PLAYER_ID => 2;
    }
}
