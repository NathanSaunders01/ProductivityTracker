require 'pry'

class User < ApplicationRecord
    has_many :activities, dependent: :destroy
    has_many :goals, dependent: :destroy
    has_many :categories, dependent: :destroy
    has_many :rewards, dependent: :destroy

    has_secure_password
    has_secure_token :auth_token  

    validates :email, presence: true, uniqueness: true
    validates :password, length: { minimum: 8 }, on: :create
    validates_format_of :email, with: /\A\S+@.+\.\S+\z/
    
    
    def invalidate_token
        self.update_columns(auth_token: nil)
    end
    
    def self.validate_login(email, password)
        user = find_by(email: email)
        if user && user.authenticate(password)
            user
        end
    end
end
