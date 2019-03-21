Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "graphql#execute"
  end
  get "/dashboard", to: "users#test"
  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :goals
      resources :activities
      resources :categories
      resources :rewards
      post "/get_chart_data", to: "goals#get_chart_data"
      get "/test", to: "users#test"
      post "/signup", to: "users#create"
      post "/get_user", to: "users#get_user"
      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"
      
    end
  end
end
