module Api::V1
    class SessionsController < ApiController
        skip_before_action :require_login, only: [:create], raise: false

        def create
            puts params[:user][:email]
            puts params[:user][:password].size

            if user = User.validate_login(params[:user][:email], params[:user][:password])
                allow_token_to_be_used_only_once_for(user)
                send_token_for_valid_login_of(user)
            else
                render_unauthorized("Invalid email or password.")
            end
        end

        def destroy
            logout
            head :ok
        end


        private

        def send_token_for_valid_login_of(user)
            userData = user.slice("first_name", "last_name", "email", "auth_token")

            goals = user.goals.where("is_recurring = ?", 1)
            updated_goals = Goal.get_additional_info_for_goals(goals)

            activities = user.activities.order(created_at: :desc)
            updated_activities = Activity.get_activity_goal_title(activities)

            todos = user.goals.where("is_recurring = ? AND completed = ?", 0, false)
            updated_todos = Goal.get_additional_info_for_todos(todos)

            categories = user.categories

            data = {
                user: userData,
                goalList: updated_goals,
                todoList: updated_todos,
                activityList: updated_activities,
                categoryList: categories
            }
            render json: data, status: :ok
        end

        def allow_token_to_be_used_only_once_for(user)
            user.regenerate_auth_token
        end

        def logout
            current_user.invalidate_token
        end
    end
end
