class WhatsWrong < ActiveRecord::Base
  def self.approved
    where(approved: true)
  end
end