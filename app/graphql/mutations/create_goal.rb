class Mutations::CreateGoal < Mutations::BaseMutation
	argument :title, String, required: true
	argument :xp_value, Integer, required: true
	argument :frequency, Integer, required: true
	argument :is_recurring, Integer, required: true

  field :goal, Types::GoalType, null: false # No need to redefine all fields if Type has been defined
	# field :title, String, null: false
	# field :xp_value, Integer, null: false
	# field :frequency, Integer, null: false
	# field :is_recurring, Integer, null: false
	field :errors, [String], null: false


	def resolve(title:, xp_value:, frequency:, is_recurring:)
		# Raise an exception if no user is present
		# if current_user.blank?
		#   raise GraphQL::ExecutionError.new("Authentication required")
		# end

		goal = Goal.new(title: title, xp_value: xp_value, frequency: frequency, is_recurring: is_recurring)
		# binding.pry
		if goal.save
		# Successful creation, return the created object with no errors
		{
			goal: goal,
			errors: [],
		}
		else
		# Failed save, return the errors to the client
		{
			goal: nil,
			errors: goal.errors.full_messages
		}
		end
	end
end