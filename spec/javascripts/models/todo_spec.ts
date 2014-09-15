/// <reference path="../../../frontend/assets/typings/tsd.d.ts" />
/// <reference path="../../../frontend/assets/typings/power-assert.d.ts" />

import assert = require('power-assert');
import TodoModel = require('../../../frontend/assets/javascripts/models/todo');

describe("Todo", function() {
  it("create", function() {
    var todo = new TodoModel.Todo({id: 1, title: "TodoTitle", is_done: true});
    assert(todo.get("title") == "TodoTitle");
  });
});
