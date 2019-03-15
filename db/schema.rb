# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_03_15_162148) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.integer "quantity"
    t.integer "total_xp"
    t.bigint "goal_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_todo", default: true
    t.index ["goal_id"], name: "index_activities_on_goal_id"
    t.index ["user_id"], name: "index_activities_on_user_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "title"
    t.string "color"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_categories_on_user_id"
  end

  create_table "categorisations", force: :cascade do |t|
    t.bigint "goal_id"
    t.bigint "category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_categorisations_on_category_id"
    t.index ["goal_id"], name: "index_categorisations_on_goal_id"
  end

  create_table "goals", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.integer "xp_value"
    t.bigint "user_id"
    t.integer "is_recurring"
    t.integer "frequency"
    t.boolean "completed", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_goals_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.string "auth_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "activities", "goals"
  add_foreign_key "activities", "users"
  add_foreign_key "categories", "users"
  add_foreign_key "goals", "users"
end
