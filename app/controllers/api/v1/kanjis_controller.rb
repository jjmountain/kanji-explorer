class Api::V1::KanjisController < ApplicationController
  def index
    if params[:query].present?
      kanjis = Kanji.search_by_term(params[:query])
    else
      kanjis = Kanji.first(10)
    end
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
