class Api::V1::PhotosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @photos = Photo.all.order(created_at: :desc)
  end

  def create
    @photo = Photo.new(permitted_params)
    if @photo.save
      render 'show', status: :created
    else
      render json: @photo.errors, status: :unprocessable_entity
    end
  end

  private

  def permitted_params
    puts params
    params.require(:photo).permit(:title, :source)
  end
end
