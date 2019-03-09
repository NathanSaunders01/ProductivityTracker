class UpdateIsRecurringToInt < ActiveRecord::Migration[5.2]
  def change
    change_column :goals, :is_recurring, 'integer USING CAST(is_recurring AS integer)'
  end
end
