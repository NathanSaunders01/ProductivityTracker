# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

75.times do |a|
    day = rand(0..120)
    time = rand(6..16)
    Activity.create!(user_id: 16, goal_id: 48, quantity: 1, total_xp: 100, is_todo: false, created_at: DateTime.now - day.days - time.hours - a.minutes)
end

60.times do |a|
    day = rand(0..120)
    time = rand(6..16)
    Activity.create!(user_id: 16, goal_id: 46, quantity: 1, total_xp: 120, is_todo: false, created_at: DateTime.now - day.days - time.hours - a.minutes)
end

75.times do |a|
    day = rand(0..120)
    time = rand(6..16)
    Activity.create!(user_id: 16, goal_id: 49, quantity: 1, total_xp: 80, is_todo: false, created_at: DateTime.now - day.days - time.hours - a.minutes)
end

20.times do |a|
    day = rand(0..120)
    time = rand(6..16)
    Activity.create!(user_id: 16, goal_id: 50, quantity: 1, total_xp: 120, is_todo: false, created_at: DateTime.now - day.days - time.hours - a.minutes)
end
90.times do |a|
    day = rand(0..120)
    time = rand(6..16)
    Activity.create!(user_id: 16, goal_id: 51, quantity: 1, total_xp: 200, is_todo: false, created_at: DateTime.now - day.days - time.hours - a.minutes)
end
