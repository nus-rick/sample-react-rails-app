class Photo < ApplicationRecord
  has_one_attached :source

  validates :title, presence: true
  validates :source, attached: true, content_type: ['image/png', 'image/jpeg', 'image/gif']
end
