# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

Rake::Task['assets:precompile'].clear
namespace :assets do
  desc "Assets precompile by Node.js"
  task :precompile => [:environment] do
    sh "npm install --production"
    sh "#{Rails.root.join("node_modules", ".bin", "bower")} install --production"
    sh "ENV=production ./node_modules/.bin/gulp browserify"
    sh "ENV=production ./node_modules/.bin/gulp sass"
  end
end
