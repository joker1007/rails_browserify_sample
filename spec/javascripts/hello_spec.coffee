assert = require('power-assert')
Hello = require('../../frontend/assets/javascripts/hello')

hello = Hello.hello

describe 'hello', ->
  it 'should return "Hello, name"', ->
    assert(hello("Name") == "Hello, Name")
