using System.Collections.Generic;
using GoThro.Models;
namespace GoThro.Repositories
{
    public interface ICourseRepository
    {
        List<Course> GetAll();
        void Add(Course course);
        void UpdateCourse(Course course);
        Course GetById(int id);
        void DeleteCourse(int id);
    }
}
