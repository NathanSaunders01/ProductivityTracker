module GraphQL
    module MutationVariables

      def create_user_mutation_variables
        attrs = attributes_for(:user)
  
        # Camelize for GraphQL compatibility and return
        camelize_hash_keys(attrs).to_json
      end

      def create_user_mutation_variables(attrs = {})
        user_attrs = attributes_for(:user)

        # Merge the arguments
        attrs.reverse_merge!(user_attrs)
        
        # Camelize for GraphQL compatibility and return
        camelize_hash_keys(attrs).to_json
      end
  
      def camelize_hash_keys(hash)
        raise unless hash.is_a?(Hash)
  
        hash.transform_keys { |key| key.to_s.camelize(:lower) }
      end
    end
  end