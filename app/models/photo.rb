class Photo < ApplicationRecord
  has_one_attached :source
end
