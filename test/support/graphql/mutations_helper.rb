module GraphQL
    module MutationsHelper
      def create_user_mutation(input = {})
        %(
          mutation CreateUser(
            $firstName: String!,
            $lastName: String!,
            $email: String!,
            $password: String!,
          ) {
            registerUser(input: {
              firstName:$firstName,
              lastName:$lastName,
              email:$email,
              password:$password,
            }) {
              user {
                id
                firstName
                lastName
                email
                errors
              }
            }
          }
        )
      end
    end
  end