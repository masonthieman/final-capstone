using GoThro.Models;

namespace GoThro.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void Add(UserProfile userProfile);
    }
}
