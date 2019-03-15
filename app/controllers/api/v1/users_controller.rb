module Api::V1
    class UsersController < ApiController
        before_action :require_login, only: [:get_user]
        def create
            user = User.new(user_params)
            if user.save
                data = user.slice("first_name", "last_name", "email", "auth_token")
                render json: data, status: :created
            else
                render json: user.errors.full_messages, status: :unprocessable_entity
            end
        end

        def test
            data = {message: "hello"}
            render json: data, status: 200
        end

        def get_user
            user = User.find_by(auth_token: params[:token])
            if user
                userData = user.slice("first_name", "last_name", "email", "auth_token")
                
                goals = user.goals.where("is_recurring = ?", 1)
                updated_goals = Goal.get_additional_info_for_goals(goals)

                todos = current_user.goals.where("is_recurring = ? AND completed = ?", 0, false)
                updated_todos = Goal.get_additional_info_for_todos(todos)

                activities = user.activities.order(created_at: :desc)
                updated_activities = Activity.get_activity_goal_title(activities)

                categories = user.categories

                data = {
                    user: userData,
                    goalList: updated_goals,
                    todoList: updated_todos,
                    activityList: updated_activities,
                    categoryList: categories
                }
                render json: data, status: :ok
            else
                data = ["User does not exist"]
                render json: data, status: 404
            end
        end

        private

        def user_params
            params.require(:user).permit(:email, :password, :first_name, :last_name)
        end
    end
end
