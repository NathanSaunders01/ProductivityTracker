module Types
    class MutationType < Types::BaseObject
      field :create_goal, mutation: Mutations::CreateGoal
      field :create_user, mutation: Mutations::CreateUser
    end
end