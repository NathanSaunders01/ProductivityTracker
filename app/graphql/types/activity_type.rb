module Types
  class ActivityType < Types::BaseObject
    field :id, Integer, null: false
    field :total_xp, Integer, null: false
    field :is_todo, Boolean, null: false
    field :goal_title, Boolean, null: false
    field :goal_id, Integer, null: false
    field :quantity, Integer, null: false
    field :created_at, String, null: false
    field :updated_at, String, null: false
  end
end
