using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Security.Cryptography;
using GoThro.Models;
using GoThro.Utils;
using Microsoft.Extensions.Hosting;
using System;

namespace GoThro.Repositories
{
    public class CourseRepository : BaseRepository, ICourseRepository
    {
        public CourseRepository(IConfiguration configuration) : base(configuration) { }

        public List<Course> GetAll(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"SELECT c.Id, c.Name, c.Holes, c.Address, IsApproved,ZipCode,City,ImageLocation,
                    up.Id AS UserId,up.Name AS UserName, Email,up.FirebaseUserId, UserTypeId,
                    s.Name As StateName, s.Abbreviation, s.Id AS StateId, pc.UserId AS PlayedUserId
                    FROM Course c LEFT JOIN UserProfile up
                    ON c.UserId = up.Id
                    LEFT Join State s
                    ON c.StateId = s.Id
                    Left Join PlayedCourse pc
                    on pc.UserId = c.Id
                    Where pc.UserId = @UserId OR pc.UserId is NULL ";
                    DbUtils.AddParameter(cmd, "@UserId", userId);
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
                                StateId = DbUtils.GetInt(reader, "StateId"),
                                State = new State()
                                {
                                    Id = DbUtils.GetInt(reader, "StateId"),
                                    Name = DbUtils.GetString(reader, "StateName"),
                                    Abbreviation = DbUtils.GetString(reader, "Abbreviation")
                                }
                            };
                            
                            if (!reader.IsDBNull(reader.GetOrdinal("UserId")))
                            {
                                course.UserProfile = new UserProfile() { 
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Name = DbUtils.GetString(reader, "UserName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    UserType = new UserType()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserTypeId")
                                    }
                                };
                            }
                            else
                            {
                                course.UserProfile = null;
                            }
                            if (!reader.IsDBNull(reader.GetOrdinal("PlayedUserId")))
                            {
                                course.PlayedByUser = true;
                            }
                            else
                            {
                                course.PlayedByUser = false;
                            }

                            courses.Add(course);

                        }
                        reader.Close();

                        return courses;
                    }
                        
                    
                }
            }
        }
        public void Add(Course course)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Course (Name, Address, Holes, ImageLocation, 
                                        City, StateId, ZipCode, IsApproved, UserId)
                                         OUTPUT INSERTED.ID
                                         VALUES (@Name, @Address, @Holes, @ImageLocation, @City, @StateId, @ZipCode,  @IsApproved, @UserProfileId)";
                    DbUtils.AddParameter(cmd, "@Name", course.Name);
                    DbUtils.AddParameter(cmd, "@Address", course.Address);
                    DbUtils.AddParameter(cmd, "@City", course.City);
                    DbUtils.AddParameter(cmd, "@StateId", course.StateId);
                    DbUtils.AddParameter(cmd, "@ZipCode", course.Zip);
                    DbUtils.AddParameter(cmd, "@Holes", course.Holes);
                    DbUtils.AddParameter(cmd, "@ImageLocation", course.ImageLocation == null ? DBNull.Value : course.ImageLocation);
                    DbUtils.AddParameter(cmd, "@IsApproved", course.IsApproved);
                    DbUtils.AddParameter(cmd, "@UserProfileId", course.UserId);

                    course.Id = (int)cmd.ExecuteScalar();
                }

            }
        }
        public void UpdateCourse(Course course)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Course
                                        SET Name = @Name,
                                            Holes = @Holes,
                                            City = @City,
                                            ZipCode = @Zip,
                                            StateId = @StateId,
                                            Address = @Address,
                                            ImageLocation = @ImageLocation
                                            WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", course.Id);
                    cmd.Parameters.AddWithValue("@Name", course.Name);
                    cmd.Parameters.AddWithValue("@Holes", course.Holes);
                    cmd.Parameters.AddWithValue("@City", course.City);
                    cmd.Parameters.AddWithValue("@Zip", course.Zip);
                    cmd.Parameters.AddWithValue("@StateId", course.StateId);
                    cmd.Parameters.AddWithValue("@Address", course.Address);
                    cmd.Parameters.AddWithValue("@ImageLocation", course.ImageLocation);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public Course GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id, c.Name, c.Holes, c.Address, IsApproved,ZipCode,City,ImageLocation,
                    up.Id AS UserId,up.Name AS UserName, Email,up.FirebaseUserId, UserTypeId,
                    s.Name As StateName, s.Abbreviation, s.Id AS StateId
                    FROM Course c LEFT JOIN UserProfile up
                    ON c.UserId = up.Id
                    LEFT Join State s
                    ON c.StateId = s.Id
                    WHERE c.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    using (var reader = cmd.ExecuteReader())
                    {
                        Course course = null;
                        if (reader.Read())
                        {
                            course = new Course()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Holes = DbUtils.GetInt(reader, "Holes"),
                                Address = DbUtils.GetString(reader, "Address"),
                                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                                Zip = DbUtils.GetString(reader, "ZipCode"),
                                City = DbUtils.GetString(reader, "City"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                StateId = DbUtils.GetInt(reader, "StateId"),
                                State = new State()
                                {
                                    Id = DbUtils.GetInt(reader, "StateId"),
                                    Name = DbUtils.GetString(reader, "StateName"),
                                    Abbreviation = DbUtils.GetString(reader, "Abbreviation")
                                }
                            };
                            course.UserProfile = null;
                            if (!reader.IsDBNull(reader.GetOrdinal("UserId")))
                            {
                                course.UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Name = DbUtils.GetString(reader, "UserName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    UserType = new UserType()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserTypeId")
                                    }
                                };
                            };

                            

                        }
                        reader.Close();

                        return course;
                    }
                }
            }
        }

        public void DeleteCourse(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Course
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
       
        public List<Course> GetUserPlayedCourses(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT pc.Id AS PlayedCourseId, pc.UserId, pc.CourseId,
                                        c.Name as CourseName, c.Holes, c.Address, c.ZipCode, City, ImageLocation,
                                        s.Name AS StateName, s.Abbreviation, s.Id AS StateId
                                        FROM PlayedCourse pc INNER JOIN Course c
                                        ON pc.CourseId = c.Id
                                        INNER JOIN State s
                                        ON c.StateId = s.Id
                                        WHERE pc.UserId = @id";
                    DbUtils.AddParameter(cmd, "@id", $"%{userId}%");
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
                                StateId = DbUtils.GetInt(reader, "StateId"),
                                State = new State()
                                {
                                    Id = DbUtils.GetInt(reader, "StateId"),
                                    Name = DbUtils.GetString(reader, "StateName"),
                                    Abbreviation = DbUtils.GetString(reader, "Abbreviation")
                                }
                            };
                            if (!reader.IsDBNull(reader.GetOrdinal("UserId")))
                            {
                                course.UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Name = DbUtils.GetString(reader, "UserName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    UserType = new UserType()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserTypeId")
                                    }
                                };
                            }
                            else
                            {
                                course.UserProfile = null;
                            }
                            courses.Add(course);
                        };
                        reader.Close();
                            


                        return courses;
                    }
                }
            }
        }
        public void AddPlayedCourse(int userId, int courseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PlayedCourse (UserId, CourseId)
                                        
                                        VALUES (@UserId, @CourseId)";

                    DbUtils.AddParameter(cmd, "@UserId", $"%{userId}%");
                    DbUtils.AddParameter(cmd, "@CourseId", $"%{courseId}%");
                    cmd.ExecuteNonQuery();
                    
                }
            }
        }

        public void DeletePlayedCourse(int userId, int courseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM PlayedCourse
                                        WHERE UserId = @UserId";
                    DbUtils.AddParameter(cmd, "@UserId", $"%{userId}%");
                    DbUtils.AddParameter(cmd, "@CourseId", $"%{courseId}%");
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
