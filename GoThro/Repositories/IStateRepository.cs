using System.Collections.Generic;
using GoThro.Models;
namespace GoThro.Repositories
{
    public interface IStateRepository
    {
        List<State> GetAll();
        State GetById(int id);
    }
}
