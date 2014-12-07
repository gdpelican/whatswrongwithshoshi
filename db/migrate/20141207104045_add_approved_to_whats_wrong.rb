class AddApprovedToWhatsWrong < ActiveRecord::Migration
  def change
    add_column :whats_wrongs, :approved, :boolean, default: false
  end
end
