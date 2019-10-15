class Kanji < ApplicationRecord
  include PgSearch
  serialize :examples, JSON
  serialize :english, JSON
  serialize :components, JSON
  serialize :nanori, JSON
  serialize :onyomi, JSON
  serialize :kunyomi, JSON

  pg_search_scope :search_by_character, against: [[ :character, 'A' ], [:kanji_radical, 'B']],
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

  pg_search_scope :search_by_example, against: [ :examples ],
  using: {
    tsearch: {
      any_word: true,
    }
  }


end
