class Category < ApplicationRecord
    belongs_to :user
    has_many :categorisations
    has_many :goals, through: :categorisations

    validates :title, :color, presence: true
end
