json.array!(@todos) do |todo|
  json.extract! todo, :id, :title, :is_done
  json.url todo_url(todo, format: :json)
end
