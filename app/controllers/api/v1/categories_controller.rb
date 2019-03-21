module Api::V1
    class CategoriesController < ApiController
        before_action :require_login
        before_action :set_category, except: [:create, :index]
        before_action :require_same_user, except: [:create, :index]

        def create
            @category = Category.new(category_params)
            @category.user_id = current_user.id
            if @category.save
                render json: @category, status: :created
            else
                render json: @category.errors.full_messages, status: :unprocessable_entity
            end
        end

        def update
            if @category.update(category_params)
                render json: @category, status: 200
            else
                render json: @category.errors.full_messages, status: :unprocessable_entity
            end
        end

        def destroy
            data = { message: "#{@category.title} has been removed"}
            if @category.destroy
                render json: data, status: 200
            else
                render json: @category.errors.full_messages, status: :unprocessable_entity
            end
        end

        private

        def category_params
            params.require(:category).permit(:title, :color)
        end

        def set_category
            @category = Category.find_by(id: params[:id])
            unless @category
                data = ["Category does not exist"]
                render json: data, status: 404
            end
        end

        def require_same_user
            if @category.user_id != current_user.id
                data = ["Category is not yours to access"]
                render json: data, status: :unprocessable_entity
            end
        end
    end
end