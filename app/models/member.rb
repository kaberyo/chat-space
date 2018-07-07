class Member < ApplicationRecord
  validates :user_id, presence: true
  belongs_to :group
  belongs_to :user
end
