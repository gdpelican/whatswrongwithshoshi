class CreateWhatsWrong < ActiveRecord::Migration
  def change
    create_table :whats_wrongs do |t|
      t.string :description
    end
  end
end
