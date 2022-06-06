json.array! @photos do |photo|
  json.(photo, :id, :title, :created_at, :updated_at)
  json.url rails_blob_url(photo.source)
end