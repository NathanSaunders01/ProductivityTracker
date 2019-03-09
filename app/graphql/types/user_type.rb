module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :first_name, String, null: true
    field :last_name, String, null: true
    field :email, String, null: true
    field :auth_token, String, null: true
    field :todos, [Types::GoalType], null: true
    field :goals, [Types::GoalType], null: true
    field :activities, [Types::ActivityType], null: true
    field :full_name, String, null: true

    def full_name
      object.first_name + " " + object.last_name
    end

    def goals
      goals = object.goals.where("is_recurring = ?", 1)
      updated_goals = Goal.get_weekly_activity_count_for_goals(goals)
    end

    def todos
      todos = object.goals.where("is_recurring = ? AND completed = ?", 0, false)
      updated_todos = Goal.get_time_left_for_todos(todos)
    end

    def activities
      activities = object.activities.order(created_at: :desc)
      updated_activities = Activity.get_activity_goal_title(activities)
    end
  end
end
