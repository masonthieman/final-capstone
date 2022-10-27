using GoThro.Models;
using GoThro.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace GoThro.Repositories
{
    public class StateRepository : BaseRepository, IStateRepository
    {
        public StateRepository(IConfiguration configuration) : base(configuration) { }

        public List<State> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, [Name], Abbreviation From State";

                    using (var reader = cmd.ExecuteReader())
                    {
                        List<State> states = new List<State>();
                        while (reader.Read())
                        {
                            State state = new State()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Abbreviation = DbUtils.GetString(reader, "Abbreviation")
                            };
                            

                            states.Add(state);

                        }
                        reader.Close();

                        return states;
                    }


                }
            }
        }
        
        public State GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, [Name], Abbreviation From State
                    WHERE Id = @Id";

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            State state = new State()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Abbreviation = DbUtils.GetString(reader, "Abbreviation")
                            };
                            reader.Close();

                            return state;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }
    }
}
