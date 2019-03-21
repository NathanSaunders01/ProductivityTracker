if Rails.env.development?
    GraphiQL::Rails.config.headers['Authorization'] = -> (_ctx) {
      "Token rKNqEWfBRXbsCySz7teQucdo"
    }
end