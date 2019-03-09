class AddToDoToActivities < ActiveRecord::Migration[5.2]
  def change
    add_column :activities, :is_todo, :boolean, default: :false
  end
end
