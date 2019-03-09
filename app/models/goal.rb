class Goal < ApplicationRecord
    belongs_to :user
    has_many :activities, dependent: :destroy

    validates :title, :xp_value, :is_recurring, :frequency, presence: true
    # validates :frequency, presence: true, if: -> { self.is_recurring == 1 }

    def time_left_to_complete
        created_at = self.created_at
        days_to_complete = self.frequency ? self.frequency : 3
        date_and_time_now = DateTime.now.to_i
        completetion_date = (created_at + days_to_complete.days).to_i
        time_left = completetion_date - date_and_time_now

        return time_left
    end

    def self.get_time_left_for_todos(todos)
        # Sort all incomplete todo items by the time left to complete
        sorted_todos = todos.sort_by { |goal| goal.time_left_to_complete }
        sorted_times = []
        sorted_todos.each { |goal| sorted_times << goal.time_left_to_complete.to_i }

        # Create JSON object to create new attribute
        json_todos = JSON.parse(sorted_todos.to_json)
        json_todos.each_with_index { |goal, index| goal["time_left"] = sorted_times[index] }
        return json_todos
    end

    def count_activities_since_start_of_week
        start_of_week = Date.today.beginning_of_week(:monday)
        week_activities = self.activities.where("created_at > ?", start_of_week).size
        puts week_activities
        return week_activities
    end

    def self.get_weekly_activity_count_for_goals(goals)
        goals_activity_count = []
        goals.each { |goal| goals_activity_count << goal.count_activities_since_start_of_week.to_i }

        # Create JSON object to create new attribute
        json_goals = JSON.parse(goals.to_json)
        json_goals.each_with_index { |goal, index| goal["week_activity_count"] = goals_activity_count[index] }
        return json_goals
    end

    def self.get_grouped_todos_by_period(todos, period)
        case period
        when "day"
            total = []
            7.times do |index|
                # Get start and end date
                start_date = (DateTime.now - index.days).beginning_of_day
                end_date = index === 0 ? DateTime.now : (DateTime.now - (index-1).days).beginning_of_day
                
                # Get all activities during this period
                activities = todos.where("created_at > ? AND created_at < ?", start_date, end_date)

                # Find sum of activities total xp
                xp_sum = activities.reduce(0) { |sum, xp| sum += xp.total_xp }

                final = xp_sum > 0 ? xp_sum : nil
                total << final
            end
        when "week"
            total = []
            8.times do |index|
                # Get start and end date
                start_date = (DateTime.now - index.weeks).beginning_of_day
                end_date = index === 0 ? DateTime.now : (DateTime.now - (index-1).weeks).beginning_of_day
                
                # Get all activities during this period
                activities = todos.where("created_at > ? AND created_at < ?", start_date, end_date)

                # Find sum of activities total xp
                xp_sum = activities.reduce(0) { |sum, xp| sum += xp.total_xp }

                final = xp_sum > 0 ? xp_sum : nil
                total << final
            end
        when "month"
            total = []
            6.times do |index|
                # Get start and end date
                start_date = (DateTime.now - index.months).beginning_of_day
                end_date = index === 0 ? DateTime.now : (DateTime.now - (index-1).months).beginning_of_day
                
                # Get all activities during this period
                activities = todos.where("created_at > ? AND created_at < ?", start_date, end_date)

                # Find sum of activities total xp
                xp_sum = activities.reduce(0) { |sum, xp| sum += xp.total_xp }

                final = xp_sum > 0 ? xp_sum : nil
                total << final
            end
        end
        data = {
            name: "ToDos",
            data: total.reverse
        }

    end

    def self.sort_goal_activities_by_period(goals, period)
        sorted_activities = []
        goals.each_with_index do |goal, index|
            case period
            when "day"
                total = []
                7.times do |index|
                    # Get start and end date
                    start_date = (DateTime.now - index.days).beginning_of_day
                    end_date = index === 0 ? DateTime.now : (DateTime.now - (index-1).days).beginning_of_day
                    
                    # Get all activities during this period
                    activities = goal.activities.where("created_at > ? AND created_at < ?", start_date, end_date)

                    # Find sum of activities total xp
                    xp_sum = activities.reduce(0) { |sum, xp| sum += xp.total_xp }

                    final = xp_sum > 0 ? xp_sum : nil
                    total << final
                end
            when "week"
                total = []
                8.times do |index|
                    # Get start and end date
                    start_date = (DateTime.now - index.weeks).beginning_of_week
                    end_date = index === 0 ? DateTime.now : (DateTime.now - (index-1).weeks).beginning_of_week
                    
                    # Get all activities during this period
                    activities = goal.activities.where("created_at > ? AND created_at < ?", start_date, end_date)

                    # Find sum of activities total xp
                    xp_sum = activities.reduce(0) { |sum, xp| sum += xp.total_xp }

                    final = xp_sum > 0 ? xp_sum : nil
                    total << final
                end
            when "month"
                total = []
                6.times do |index|
                    # Get start and end date
                    start_date = (DateTime.now - index.months).beginning_of_month
                    end_date = index === 0 ? DateTime.now : (DateTime.now - (index-1).months).beginning_of_month
                    
                    # Get all activities during this period
                    activities = goal.activities.where("created_at > ? AND created_at < ?", start_date, end_date)

                    # Find sum of activities total xp
                    xp_sum = activities.reduce(0) { |sum, xp| sum += xp.total_xp }

                    final = xp_sum > 0 ? xp_sum : nil
                    total << final
                end
            end
            data = {
                name: goal.title,
                data: total.reverse
            }
            sorted_activities << data
        end
        return sorted_activities
    end
end
