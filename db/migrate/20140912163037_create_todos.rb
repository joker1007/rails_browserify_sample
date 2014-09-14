class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :title, null: false
      t.boolean :is_done, null: false, default: false

      t.timestamps
    end
  end
end
