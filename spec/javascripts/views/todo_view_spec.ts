/// <reference path="../../../app/assets/typings/tsd.d.ts" />
/// <reference path="../../../app/assets/typings/power-assert.d.ts" />

import assert = require('power-assert');
import TodoModel = require('../../../app/assets/javascripts/models/todo');
import TodoView = require('../../../app/assets/javascripts/views/todo_view');

describe("TodoView", function() {
  describe("render", function() {
    it("should render Todo HTML", function() {
      var todo1 = new TodoModel.Todo({id: 1, title: "やること", is_done: false});
      var todo2 = new TodoModel.Todo({id: 2, title: "やること2", is_done: false});
      var todos = new TodoModel.TodoCollection([todo1, todo2])
      var todoCollectionView = new TodoView.TodoCollectionView({collection: todos});
      todoCollectionView.render();
      assert(todoCollectionView.$(".todo").length == 2);
    });
  });

  describe("events", function() {
    it("change is_done status, if click is_done checkbox", function() {
      var todo1 = new TodoModel.Todo({id: 1, title: "やること", is_done: false});
      var todoView = new TodoView.TodoView({model: todo1});
      todoView.render();
      assert(todoView.$(".is_done_checkbox").length == 1);
      todoView.$(".is_done_checkbox").click();
      todoView.$(".is_done_checkbox").trigger('change');
      assert(todo1.get("is_done"));

      todoView.$(".is_done_checkbox").click();
      todoView.$(".is_done_checkbox").trigger('change');
      assert(!todo1.get("is_done"));
    });

    it("change element class, if change model is_done attributes", function() {
      var todo1 = new TodoModel.Todo({id: 1, title: "やること", is_done: false});
      var todoView = new TodoView.TodoView({model: todo1});
      todoView.render();
      assert(!todoView.$el.hasClass("is_done"));
      todo1.set({"is_done": true});
      assert(todoView.$el.hasClass("is_done"));
    });
  });
});
