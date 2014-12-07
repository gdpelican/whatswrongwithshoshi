class WhatsWrong < ActiveRecord::Base
  def self.approved
    where approved: true
  end

  def self.unapproved
    where approved: false
  end
end