# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'
require 'json'

puts "Deleting Kanji"

Kanji.delete_all

kanji_filepath = 'db/All_in_one_Kanji_-_Heisig_order.json'

puts "Reading Kanji filepath"

kanji = JSON.parse(File.read(kanji_filepath))

puts "Creating Kanji from JSON"

kanji["notes"].each do |note|
  Kanji.create!(
    character: note["fields"][0],
    onyomi: note["fields"][1],
    kunyomi: note["fields"][2],
    nanori: note["fields"][3],
    english: note["fields"][4],
    examples: note["fields"][5],
    jlpt: note["fields"][6],
    jouyou: note["fields"][7],
    frequency: note["fields"][8],
    components: note["fields"][9],
    kanji_strokes: note["fields"][10],
    kanji_radical: note["fields"][11],
    radical_number: note["fields"][12],
    radical_reading: note["fields"][14],
    traditional: note["fields"][15],
    classification: note["fields"][16],
    keyword: note["fields"][17],
    koohii1: note["fields"][18],
    koohii2: note["fields"][19],
    rtk: note["fields"][20]
  )
end

puts "Kanji Created!"