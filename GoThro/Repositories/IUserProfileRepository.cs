using GoThro.Models;
using System.Collections.Generic;

namespace GoThro.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void Add(UserProfile userProfile);
        List<UserProfile> GetAllUsers();
    }
}
