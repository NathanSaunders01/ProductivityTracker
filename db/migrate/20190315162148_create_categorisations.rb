class CreateCategorisations < ActiveRecord::Migration[5.2]
  def change
    create_table :categorisations do |t|
      t.belongs_to :goal, index: true
      t.belongs_to :category, index: true
      t.timestamps
    end
  end
end
