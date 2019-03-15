module Types
  class GoalType < Types::BaseObject
    graphql_name "Goal"

    field :id, Integer, null: false
    field :title, String, null: true
    field :xp_value, Integer, null: true
    field :is_recurring, Integer, null: true
    field :frequency, Integer, null: true
    field :completed, Boolean, null: true
    field :time_left, Integer, null: true
    field :week_activity_count, Integer, null: true
    field :created_at, String, null: true
    field :updated_at, String, null: true

  end
end
