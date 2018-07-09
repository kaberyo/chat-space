class Message < ApplicationRecord
  validates :body, presence: true, unless: :img?

  belongs_to :user
  belongs_to :group

  mount_uploader :img, ImageUploader

end
