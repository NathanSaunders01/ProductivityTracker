class Reward < ApplicationRecord
    belongs_to :user

    validates :title, :xp_target, :date_target, presence: true
end
