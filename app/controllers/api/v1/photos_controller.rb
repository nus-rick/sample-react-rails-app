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
      render json: @photo.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    photo = Photo.find(params[:id])
    photo.destroy

    render json: {id: photo.id}, status: :ok
  end

  private

  def permitted_params
    params.require(:photo).permit(:title, :source)
  end
end
