class Activity < ApplicationRecord
    belongs_to :user
    belongs_to :goal

    validates :quantity, presence: true

    def self.get_activity_goal_name(activities)
        activities_goal_name = []
        activities.each { |activity| activities_goal_name << activity.goal.title }

        json_activities = JSON.parse(activities.to_json)
        json_activities.each_with_index { |activity, index| activity["goal_title"] = activities_goal_name[index] }
        return json_activities
    end
end
