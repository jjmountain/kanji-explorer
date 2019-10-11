class Kanji < ApplicationRecord
  include PgSearch

  pg_search_scope :search_by_term, against: [ 
  [:character, 'A'], 
  [:koohii1, 'C'], 
  [:koohii2, 'C'], 
  [:onyomi, 'B'], 
  [:kunyomi, 'B'], 
  [:english, 'A'], 
  [:keyword, 'A'], 
  [:examples, 'B'],
  [:kanji_radical, 'B']
  ],
    using: {
      tsearch: {
        any_word: true,
        prefix: true
      }
    }
end
