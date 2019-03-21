ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  include ::FactoryBot::Syntax::Methods

  Dir[Rails.root.join('test/support/**/*.rb')].each { |f| require f }

  include GraphQL::MutationsHelper
  include GraphQL::ResponseParser
  include GraphQL::MutationVariables
end
