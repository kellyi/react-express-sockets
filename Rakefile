task default: %[build]

desc "Build project"
task :build do
  puts "Building containers"
  sh "docker-compose build"
end

desc "Lint code"
task :lint do
  puts "Linting code"
  sh "docker-compose run --rm exp npm run lint"
end

desc "Start development server"
task :server do
  puts "Starting development server"
  sh "docker-compose up"
end

desc "Run tests"
task :test do
  puts "Running tests"
  sh "docker-compose run --rm exp npm run test"
end

desc "Update npm packages"
task :update do
  puts "Updating npm packages"
  sh "docker-compose run --rm exp npm install"
end

desc "Start Node REPL in exp container"
task :repl do
  puts "Starting Node REPL"
  sh "docker-compose run --rm exp node"
end
