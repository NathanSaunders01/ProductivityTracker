module Api::V1
    class ActivitiesController < ApiController
        before_action :require_login
        before_action :set_activity, except: [:create, :index]
        before_action :require_same_user, except: [:create, :index]

        def index
            @activities = Activity.where("user_id", current_user.id)
            render json: @activities, status: :ok
        end

        def create
            @activity = Activity.new(activity_params)
            @activity.user_id = current_user.id
            @activity.total_xp = @activity.goal ? @activity.goal.xp_value * @activity.quantity : 0
            if @activity.save
                goal = Goal.find(@activity.goal_id)
                if @activity.is_todo === true
                    puts "what is going on"
                    goal.update(completed: true) 
                end
                puts goal.errors.full_messages
                json_goal = JSON.parse(goal.to_json)
                json_goal["week_activity_count"] = goal.count_activities_since_start_of_week
                activity = JSON.parse(@activity.to_json)
                activity["goal_title"] = @activity.goal.title
                data = {
                    activity: activity,
                    goal: json_goal
                }
                render json: data, status: :created
            else
                render json: @activity.errors.full_messages, status: :unprocessable_entity
            end
        end

        def destroy
            goal = @activity.goal
            if @activity.destroy
                data = JSON.parse(goal.to_json)
                if goal.is_recurring === 0
                    goal.update(completed: false)
                    data["time_left"] = goal.time_left_to_complete
                else
                    data["week_activity_count"] = goal.count_activities_since_start_of_week
                end
                render json: data, status: 200
            else
                render json:  @activity.errors.full_messages, status: :unprocessable_entity
            end
        end

        private

        def activity_params
            params.require(:activity).permit(:quantity, :goal_id, :is_todo)
        end
        
        def set_activity
            @activity = Activity.find_by(id: params[:id])
            unless @activity
                data = ["Activity does not exist"]
                render json: data, status: 404
            end
        end

        def require_same_user
            if @activity.user_id != current_user.id
                data = ["Activity is not yours to access"]
                render json: data, status: :unprocessable_entity
            end
        end
    end
end
