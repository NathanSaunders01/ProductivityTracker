module Api::V1
    class GoalsController < ApiController
        before_action :require_login
        before_action :set_goal, except: [:create, :index, :get_chart_data]
        before_action :require_same_user, except: [:create, :get_chart_data]

        def index
            @goals = Goal.all.where("user_id = ?", current_user.id)
            goals = current_user.goals.where("is_recurring = ?", 1)
            todos = current_user.goals.where("is_recurring = ? AND completed = ?", 0, false)

            # Sort all incomplete todo items by the time left to complete
            sorted_todos = todos.sort_by { |goal| goal.time_left_to_complete }
            sorted_times = []
            sorted_todos.each { |goal| sorted_times << goal.time_left_to_complete.to_i }

            # Create JSON object to create new attribute
            json_todos = JSON.parse(sorted_todos.to_json)
            json_todos.each_with_index { |goal, index| goal["time_left"] = sorted_times[index] }

            data = {
                goalList: goals,
                todoList: json_todos
            }
            
            render json: data, status: :ok
        end
        
        def create
            @goal = Goal.new(goal_params)
            @goal.user_id = current_user.id
            if @goal.save
                goal_data = JSON.parse(@goal.to_json)
                goal_data["time_left"] = @goal.time_left_to_complete if @goal.is_recurring === 0
                goal_data["week_activity_count"] = 0
                render json: goal_data, status: :created
            else
                render json: @goal.errors.full_messages, status: :unprocessable_entity
            end
        end

        def update
            if @goal.update(goal_params)
                render json: @goal, status: 200
            else
                render json: @goal.errors.full_messages, status: :unprocessable_entity
            end
        end

        def show
            render json: @goal, status: :ok
        end
        

        def destroy
            data = { message: "#{@goal.title} has been removed"}
            if @goal.destroy
                render json: data, status: 200
            else
                render json: @goal.errors.full_messages, status: :unprocessable_entity
            end
        end

        

        def get_chart_data
            period = params[:period]
            goals = current_user.goals.where("is_recurring = ?", 1)
            todo_activities = current_user.activities.where("is_todo = ?", true)
            series = Goal.sort_goal_activities_by_period(goals, period)
            grouped_todos = Goal.get_grouped_todos_by_period(todo_activities, period)
            series << grouped_todos
            categories = []
            case period
            when "day"
                7.times { |i| categories << (DateTime.now - i.days).strftime("%a") }
                categories = categories.reverse
                series = series
                title = "XP by day"
            when "week"
                8.times { |i| categories << (DateTime.now - i.weeks).beginning_of_week.strftime("%-d/%-m") }
                categories = categories.reverse
                series = series
                title = "XP by week"
            when "month"
                6.times { |i| categories << (DateTime.now - i.months).beginning_of_month.strftime("%-d/%-m") }
                categories = categories.reverse
                series = series
                title = "XP by month"
            end
            data = {
                title: title,
                categories: categories,
                series: series
            }
            render json: data, status: :ok
        end

        private

        def goal_params
            params.require(:goal).permit(
                :title, :description, :xp_value, 
                :is_recurring, :frequency, :completed
            )
        end

        def set_goal
            @goal = Goal.find_by(id: params[:id])
            unless @goal
                data = ["Goal does not exist"]
                render json: data, status: 404
            end
        end

        def require_same_user
            if @goal.user_id != current_user.id
                data = ["Goal is not yours to access"]
                render json: data, status: :unprocessable_entity
            end
        end
    end
end