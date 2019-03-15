module Types
  class MutationType < Types::BaseObject
    field :create_goal, mutation: Mutations::CreateGoal
  end
end
