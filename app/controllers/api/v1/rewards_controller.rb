module Api::V1
    class RewardsController < ApiController
        before_action :require_login
        before_action :set_reward, except: [:create, :index]
        before_action :require_same_user, except: [:create, :index]

        def create
            @reward = Reward.new(reward_params)
            @reward.user_id = current_user.id
            if @reward.save
                render json: @reward, status: :created
            else
                render json: @reward.errors.full_messages, status: :unprocessable_entity
            end
        end

        def update
            if @reward.update(reward_params)
                render json: @reward, status: 200
            else
                render json: @reward.errors.full_messages, status: :unprocessable_entity
            end
        end

        def destroy
            data = { message: "#{@reward.title} has been removed"}
            if @reward.destroy
                render json: data, status: 200
            else
                render json: @reward.errors.full_messages, status: :unprocessable_entity
            end
        end

        private

        def reward_params
            params.require(:reward).permit(:title, :xp_target, :date_target)
        end

        def set_reward
            @reward = Reward.find_by(id: params[:id])
            unless @reward
                data = ["Reward does not exist"]
                render json: data, status: 404
            end
        end

        def require_same_user
            if @reward.user_id != current_user.id
                data = ["Reward is not yours to access"]
                render json: data, status: :unprocessable_entity
            end
        end
    end
end
