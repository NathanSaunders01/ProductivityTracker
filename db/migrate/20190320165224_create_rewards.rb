class CreateRewards < ActiveRecord::Migration[5.2]
  def change
    create_table :rewards do |t|
      t.string :title
      t.string :date_target
      t.integer :xp_target
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
