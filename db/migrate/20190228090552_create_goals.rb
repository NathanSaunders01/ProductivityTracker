class CreateGoals < ActiveRecord::Migration[5.2]
  def change
    create_table :goals do |t|
      t.string :title
      t.string :description
      t.integer :xp_value
      t.references :user, foreign_key: true
      t.string :is_recurring
      t.integer :frequency
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
