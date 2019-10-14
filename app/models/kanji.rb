class Kanji < ApplicationRecord
  include PgSearch
  serialize :examples, JSON
  serialize :english, JSON
  serialize :components, JSON
  serialize :nanori, JSON
  serialize :onyomi, JSON
  serialize :kunyomi, JSON


  pg_search_scope :search_by_term, against: [ 
  [:character, 'A'], 
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
        prefix: false
      }
    }

  pg_search_scope :search_by_character, against: [ :character ],
  using: {
    tsearch: {
      any_word: true,
      prefix: true
    }
  }

  pg_search_scope :search_by_reading, against: [ :onyomi, :kunyomi ],
  using: {
    tsearch: {
      any_word: true
    }
  }

  pg_search_scope :search_by_english, against: [ :english, :keyword ],
  using: {
    tsearch: {
      any_word: true    }
  }

  pg_search_scope :search_by_radical, against: [ :radical ],
  using: {
    tsearch: {
      any_word: true    }
  }

  pg_search_scope :search_by_example, against: [ :example ],
  using: {
    tsearch: {
      any_word: true,
      prefix: true
    }
  }


end
