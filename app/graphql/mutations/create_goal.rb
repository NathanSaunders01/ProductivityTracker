module Mutations
class Mutations::CreateGoal < Mutations::BaseMutation
	graphql_name "goal"
	argument :title, String, required: true
	argument :xp_value, Integer, required: true
	argument :frequency, Integer, required: true
	argument :is_recurring, Integer, required: true

	field :title, String, null: false
	field :xp_value, Integer, null: false
	field :frequency, Integer, null: false
	field :is_recurring, Integer, null: false


	def resolve(title:, xp_value:, frequency:, is_recurring:)
			goal = Goal.new(title: title, xp_value: xp_value, frequency: frequency, is_recurring: is_recurring)
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
end