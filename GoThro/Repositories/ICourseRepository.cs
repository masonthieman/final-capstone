using System.Collections.Generic;
using GoThro.Models;
namespace GoThro.Repositories
{
    public interface ICourseRepository
    {
        List<Course> GetAll();
    }
}
