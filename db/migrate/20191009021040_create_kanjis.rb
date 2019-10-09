class CreateKanjis < ActiveRecord::Migration[5.2]
  def change
    create_table :kanjis do |t|
      t.string :character, null: false
      t.text :koohii1
      t.text :koohii2
      t.string :onyomi
      t.string :kunyomi
      t.string :nanori
      t.string :english
      t.text :examples
      t.integer :jlpt
      t.text :components
      t.integer :kanji_strokes
      t.string :kanji_radical
      t.integer :radical_number
      t.string :radical_reading
      t.string :classification
      t.string :keyword
      t.string :grade
      t.string :frequency
      t.string :type
      t.integer :jouyou
      t.string :traditional
      t.integer :rtk
      t.timestamps

    end
  end
end
