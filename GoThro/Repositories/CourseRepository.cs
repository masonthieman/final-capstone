using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Security.Cryptography;
using GoThro.Models;
using GoThro.Utils;
namespace GoThro.Repositories
{
    public class CourseRepository : BaseRepository, ICourseRepository
    {
        public CourseRepository(IConfiguration configuration) : base(configuration) { }

        public List<Course> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id, c.Name, c.Holes, c.Address, IsApproved,ZipCode,City,ImageLocation,
                    up.Id AS UserId,up.Name AS UserName, Email,
                    s.Name As StateName, s.Abbreviation, s.Id AS StateId
                    FROM Course c LEFT JOIN UserProfile up
                    ON c.UserId = up.Id
                    LEFT Join State s
                    ON c.StateId = s.Id";

                    using (var reader = cmd.ExecuteReader())
                    {
                        List<Course> courses = new List<Course>();
                        while (reader.Read())
                        {
                            Course course = new Course()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Holes = DbUtils.GetInt(reader, "Holes"),
                                Address = DbUtils.GetString(reader, "Address"),
                                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                                Zip = DbUtils.GetString(reader, "ZipCode"),
                                City = DbUtils.GetString(reader, "City"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                State = new State()
                                {
                                    Id = DbUtils.GetInt(reader, "StateId"),
                                    Name = DbUtils.GetString(reader, "StateName"),
                                    Abbreviation = DbUtils.GetString(reader, "Abbreviation")
                                }
                            };
                            course.UserProfile = new UserProfile();
                            if (!reader.IsDBNull(reader.GetOrdinal("UserId")))
                            {
                                course.UserProfile.Id = DbUtils.GetInt(reader, "UserId");
                                course.UserProfile.Name = DbUtils.GetString(reader, "UserName");
                                course.UserProfile.Email = DbUtils.GetString(reader, "Email");
                            };

                            courses.Add(course);

                        }
                        reader.Close();

                        return courses;
                    }
                        
                    
                }
            }
        }
    }
}
