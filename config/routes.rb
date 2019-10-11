Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'kanjis/index'
      get 'kanjis/index/:query', to: 'kanjis#index'
      get '/show/:id', to: 'kanjis#show'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
