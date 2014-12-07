require 'i18n'
require 'i18n/backend/fallbacks'
require 'sinatra'
require 'haml'

### CONSTANTS

WHATS_WRONG = [:covered_in_bees, :adopted_a_feral_badger, :invested_in_gluten,
               :scolded_by_an_old_person, :aubergine_past_its_prime, :inner_thigh_itch]

### CONFIGURATION

def configure_i18n
  I18n::Backend::Simple.send :include, I18n::Backend::Fallbacks
  I18n.load_path = Dir[File.join(settings.root, 'translations', '*.yml')]
  I18n.backend.load_translations
end

configure do
  configure_i18n
end

### ROUTING

get '/' do
  haml :'index.html', layout: :'layout.html'
end

get '/whatswrong' do
  I18n.t :"whats_wrong.#{WHATS_WRONG.sample}"
end
