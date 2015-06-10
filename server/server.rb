require 'rubygems'
require 'bundler'
require 'json'

Bundler.require(:default)

set :public, File.dirname(__FILE__) + '/public'

get '/' do
  erb :index
end

post '/upload' do
  sleep 1

	if params[:file]
		save_path = File.join(File.dirname(__FILE__), '/public/uploads/', params[:file][:filename])

		File.open(save_path, 'wb') do |f|
			f.write params[:file][:tempfile].read
		end

    {
      status: 200,
      url: File.join('/uploads/', params[:file][:filename]).to_s
    }.to_json
  else
    500
	end
end
