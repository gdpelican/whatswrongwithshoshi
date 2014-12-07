require 'i18n'
require 'i18n/backend/fallbacks'
require 'haml'
require 'sinatra'
require 'sinatra/activerecord'
require './config/environments'
require './models/whats_wrong'

### CONFIGURATION

def configure_vars
  @@previous = nil
end

def configure_i18n
  I18n::Backend::Simple.send :include, I18n::Backend::Fallbacks
  I18n.load_path = Dir[File.join(settings.root, 'translations', '*.yml')]
  I18n.backend.load_translations
end

configure do
  configure_vars
  configure_i18n
end

### ROUTING

get '/' do
  haml :'index.html', layout: :'layout.html'
end

get '/whatswrong' do
  whats_wrong.description
end

post '/thatswhatswrong' do
  WhatsWrong.create(description: params[:description]) && params[:description]
end

get '/approvewhatswrong' do
  if ENV['SALT'] && ENV['PEPPER'] && params[ENV['SALT']] == ENV['PEPPER']
    @unapproved = WhatsWrong.unapproved
    haml :'unapproved.html', layout: :'layout.html'
  else
    I18n.t(:unauthorized)
  end
end

post '/approvewhatswrong' do
  WhatsWrong.find(params[:id]).update approved: true
end

post '/rejectwhatswrong' do
  WhatsWrong.find(params[:id]).destroy
end

def whats_wrong
  until !@current.nil? && @@previous != @current do
    @current = WhatsWrong.approved.order('random()').first
  end
  @@previous = @current
end
