class Api::V1::KanjisController < ApplicationController
  def index
    kanjis = Kanji.all
    render json: kanjis
  end

  def show
    if kanji
      render json: kanji
    else
      render json: kanji.errors
    end
  end

  private 

  def kanji
    @kanji ||= Kanji.find(params[:id])
  end
end
