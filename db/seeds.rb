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

# see if english array is empty - if it is give it a value of empty string
# if it is not empty see if it has <br> in it, if not skip the array step and go straight to making a hash

def replace_double_with_single_quote(str_entry)
  str_entry.gsub!(/\"/, "\'")
  if str_entry.include?("“")
    str_entry.gsub!(/“/, "\'")
    str_entry.gsub!(/”/, "\'")
  end
  return str_entry
end

def generate_components_array(str_entry)
  # check for a line break, if present split to an array on entries, then break into hash between colons
  entries_array = []
  if str_entry.include?('<br>')
    entry_array = str_entry.split(/\<\/?br>/)
    entry_array.each do |example|
      entry_hash = {}
      split_array = example.split(':', 2)
      entry_hash["component_kanji"] = split_array[0]
      entry_hash["component_english"] = split_array[1].strip
      entries_array << entry_hash
    end
  elsif !str_entry.empty?
    entry_hash = {}
    split_array = str_entry.split(':', 2)
    entry_hash["component_kanji"] = split_array[0]
    entry_hash["component_english"] = split_array[1].strip
  else
    entries_array = ''
  end
  entries_array
end

## str_entry is a string with lots of examples. each example is separated by <br>

def generate_examples_array(str_entry)

  # if there are multiple examples, 
  new_examples_array = []
  if str_entry.include?('<br')
    examples_array = str_entry.split(/\<\/?br ?\/?>/)
    examples_array.each_with_index do |example, index|
      example_hash = {}
      split_array = example.split(':', 2)
      kanji_str = split_array[0].gsub(/\(.+\)/, '')
      example_hash["example_kanji"] = kanji_str
      new_examples_array << build_reading_hash(example, example_hash)
    end
  elsif !str_entry.empty?
    example_hash = {}
    split_array = str_entry.split(':', 2)
    kanji_str = split_array[0].gsub(/\(.+\)/, '')
    example_hash["example_kanji"] = kanji_str
    new_examples_array << build_reading_hash(str_entry, example_hash)
  else
    new_examples_array = ''
  end
  return new_examples_array
end

## this method takes an example string (kanji / english meaning pair) 
## and returns an embedder hash of structure (Kanji: (reading: english))
def build_reading_hash(example, example_hash)
  mod_example = replace_double_with_single_quote(example)
  split_array = mod_example.split(':', 2)
  split_array[1].strip!
  english_array = split_array[1].split(/\([0-9]+\)/)
  english_array.map! { |entry| entry.strip }
  english_array.delete("")
  reading_str = split_array[0].split(/\(/)[1].delete(')')
  key_name = "example_reading"
  example_hash["example_reading"] = reading_str
  example_hash["example_english"] = english_array
  return example_hash
end

def generate_entry_array(str_entry)
  str_entry.split(',')
end

def generate_entry_array_japanese_comma(str_entry)
  str_entry.split('、')
end



kanji["notes"].each do |note|
  Kanji.create!(
    character: note["fields"][0],
    onyomi: generate_entry_array_japanese_comma(note["fields"][1]),
    kunyomi: generate_entry_array_japanese_comma(note["fields"][2]),
    nanori: generate_entry_array(note["fields"][3]),
    english: generate_entry_array(note["fields"][4]),
    examples: generate_examples_array(note["fields"][5]),
    jlpt: note["fields"][6],
    jouyou: note["fields"][7],
    frequency: note["fields"][8],
    components: generate_components_array(note["fields"][9]),
    kanji_strokes: note["fields"][10],
    kanji_radical: note["fields"][11],
    radical_number: note["fields"][12],
    radical_reading: note["fields"][14],
    traditional: note["fields"][15],
    classification: note["fields"][16],
    keyword: note["fields"][17],
    koohii1: replace_double_with_single_quote(note["fields"][18]),
    koohii2: replace_double_with_single_quote(note["fields"][19]),
    rtk: note["fields"][20]
  )
end

puts "Kanji Created!"