require 'test_helper'

module Mutations
    class UserMutationsTest < ActionDispatch::IntegrationTest
        test 'create user with valid params' do
            post('/graphql', params: {
                query: create_user_mutation,
                variables: create_user_mutation_variables({first_name: 'Jamie'})
            })
    
            # Assertions
            @json_response = parse_graphql_response(response.body)

            assert_equal true, @json_response.dig("createUser", "success")
            assert_equal 'Jamie', @json_response.dig("createUser", "user", "firstName")
        end
    end
end