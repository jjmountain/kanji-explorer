class Api::V1::KanjisController < ApplicationController
  def index
    if params[:query].present?
      character_matches = Kanji.search_by_character(params[:query]).page(params[:page] ? params[:page].to_i : 1)
      reading_matches = Kanji.search_by_reading(params[:query]).page(params[:page] ? params[:page].to_i : 1)
      english_matches = Kanji.search_by_english(params[:query]).page(params[:page] ? params[:page].to_i : 1)
      radical_matches = Kanji.search_by_radical(params[:query]).page(params[:page] ? params[:page].to_i : 1)
      example_matches = Kanji.search_by_example(params[:query]).page(params[:page] ? params[:page].to_i : 1)
    else
      kanjis = Kanji.all.order(id: :asc).page(params[:page] ? params[:page].to_i : 1)
    end
   render json: { 
     character_matches: {
       kanji: character_matches,
       meta: pagination_meta(character_matches),
     },
     reading_matches: {
      kanji: reading_matches,
      meta: pagination_meta(reading_matches),
    },
      english_matches: {
      kanji: english_matches,
      meta: pagination_meta(english_matches),
    },
      radical_matches: {
      kanji: radical_matches,
      meta: pagination_meta(radical_matches),
    },
      example_matches: {
      kanji: example_matches,
      meta: pagination_meta(example_matches),
    }
  }
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
