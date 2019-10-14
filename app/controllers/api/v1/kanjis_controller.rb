class Api::V1::KanjisController < ApplicationController
  def index
    if params[:query].present?
      kanjis = Kanji.search_by_term(params[:query]).page(params[:page] ? params[:page].to_i : 1)
    else
      kanjis = Kanji.all.order(id: :asc).page(params[:page] ? params[:page].to_i : 1)
    end
   render json: {objects: kanjis,
   meta: pagination_meta(kanjis) }
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

  def pagination_meta(object)        {        
    current_page: object.current_page,        
    next_page: object.next_page,        
    prev_page: object.prev_page,        
    total_pages: object.total_pages,        
    total_count: object.total_count        }    
   end
end
