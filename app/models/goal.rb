class Goal < ApplicationRecord
    belongs_to :user
    has_many :activities, dependent: :destroy
    has_many :categorisations
    has_many :categories, through: :categorisations

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

    def self.get_additional_info_for_todos(todos)
        # Sort all incomplete todo items by the time left to complete
        sorted_todos = todos.sort_by { |goal| goal.time_left_to_complete }
        sorted_times = []
        sorted_bonus = []
        sorted_todos.each do |goal| 
            sorted_times << goal.time_left_to_complete.to_i
            sorted_bonus << goal.completed_in_time
        end

        # Create JSON object to create new attribute
        json_todos = JSON.parse(sorted_todos.to_json)
        json_todos.each_with_index do |goal, index| 
            goal["time_left"] = sorted_times[index] 
            goal["bonus_available"] = sorted_bonus[index] 
        end
        return json_todos
    end

    def count_activities_since_start_of_week
        start_of_week = Date.today.beginning_of_week(:monday)
        week_activities = self.activities.where("created_at > ?", start_of_week).size
        return week_activities
    end

    def self.get_additional_info_for_goals(goals)
        goals_activity_count = []
        goals_is_on_streak = []
        goals_category_ids_array = [];
        goals.each do |goal|
            category_ids = goal.categories.map { |cat| cat.id }
            goals_category_ids_array << category_ids
            goals_activity_count << goal.count_activities_since_start_of_week.to_i 
            goals_is_on_streak << goal.did_reach_frequency_last_week
        end

        # Create JSON object to create new attribute
        json_goals = JSON.parse(goals.to_json)
        json_goals.each_with_index do |goal, index| 
            goal["categories"] = goals_category_ids_array[index]
            goal["week_activity_count"] = goals_activity_count[index]
            goal["is_on_streak"] = goals_is_on_streak[index] 
        end
        return json_goals
    end

    def self.get_grouped_todos_by_period(todos, period)
        has_xp = false
        case period
        when "day"
            total = []
            7.times do |index|
                # Get start and end date
                start_date = (DateTime.now - index.days).beginning_of_day
                end_date = index === 0 ? DateTime.now : (DateTime.now - index.days).end_of_day
                
                # Get all activities during this period
                activities = todos.where("created_at > ? AND created_at < ?", start_date, end_date)

                # Find sum of activities total xp
                xp_sum = activities.reduce(0) { |sum, xp| sum += xp.total_xp }

                # Check value isn't 0 and confirm goal has values to store in series
                if xp_sum > 0
                    has_xp = true
                    total << xp_sum
                else
                    total << nil
                end
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

                # Check value isn't 0 and confirm goal has values to store in series
                if xp_sum > 0
                    has_xp = true
                    total << xp_sum
                else
                    total << nil
                end
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

                # Check value isn't 0 and confirm goal has values to store in series
                if xp_sum > 0
                    has_xp = true
                    total << xp_sum
                else
                    total << nil
                end
            end
        end

        if has_xp
            data = {
                name: "ToDos",
                data: total.reverse
            }
        else 
            return false
        end

    end

    def self.sort_goal_activities_by_period(goals, period)
        sorted_activities = []
        goals.each_with_index do |goal, index|
            has_xp = false
            case period
            when "day"
                total = []
                7.times do |index|
                    # Get start and end date
                    start_date = (DateTime.now - index.days).beginning_of_day
                    end_date = index === 0 ? DateTime.now : (DateTime.now - index.days).end_of_day
                    
                    # Get all activities during this period
                    activities = goal.activities.where("created_at > ? AND created_at < ?", start_date, end_date)

                    # Find sum of activities total xp
                    xp_sum = activities.reduce(0) { |sum, xp| sum += xp.total_xp }
                    
                    # Check value isn't 0 and confirm goal has values to store in series
                    if xp_sum > 0
                        has_xp = true
                        total << xp_sum
                    else
                        total << nil
                    end
                end
            when "week"
                total = []
                8.times do |index|
                    # Get start and end date
                    start_date = (DateTime.now - index.weeks).beginning_of_week.beginning_of_day
                    end_date = index === 0 ? DateTime.now : (DateTime.now - index.weeks).end_of_week.end_of_day
                    
                    # Get all activities during this period
                    activities = goal.activities.where("created_at > ? AND created_at < ?", start_date, end_date)

                    # Find sum of activities total xp
                    xp_sum = activities.reduce(0) { |sum, xp| sum += xp.total_xp }

                    # Check value isn't 0 and confirm goal has values to store in series
                    if xp_sum > 0
                        has_xp = true
                        total << xp_sum
                    else
                        total << nil
                    end
                end
            when "month"
                total = []
                6.times do |index|
                    # Get start and end date
                    start_date = (DateTime.now - index.months).beginning_of_month.beginning_of_day
                    end_date = index === 0 ? DateTime.now : (DateTime.now - index.months).end_of_month.end_of_day
                    
                    # Get all activities during this period
                    activities = goal.activities.where("created_at > ? AND created_at < ?", start_date, end_date)

                    # Find sum of activities total xp
                    xp_sum = activities.reduce(0) { |sum, xp| sum += xp.total_xp }

                    # Check value isn't 0 and confirm goal has values to store in series
                    if xp_sum > 0
                        has_xp = true
                        total << xp_sum
                    else
                        total << nil
                    end
                end
            end
            if has_xp
                data = {
                    name: goal.title,
                    data: total.reverse
                }
                sorted_activities << data
            end
        end
        return sorted_activities
    end

    def check_for_bonus_xp
        if self.is_recurring === 0
            get_bonus = self.completed_in_time
        else
            get_bonus = self.did_reach_frequency_last_week
        end
        xp_value = get_bonus ? (1.2*self.xp_value).floor.to_i : self.xp_value
    end

    def completed_in_time
        cut_off_date = self.created_at + (((self.frequency*24)/2).floor).hours
        return DateTime.now < cut_off_date        
    end

    def did_reach_frequency_last_week
        start_date = (DateTime.now - 1.weeks).beginning_of_week.beginning_of_day
        end_date = (DateTime.now - 1.weeks).end_of_week.end_of_day
        week_count = self.activities.where("created_at > ? AND created_at < ?", start_date, end_date).count
        return week_count >= self.frequency
    end
end
