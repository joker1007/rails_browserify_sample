/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./models/todo.ts" />

import $ = require('jquery');
import Backbone = require('backbone');
Backbone.$ = $;
import Marionette = require('backbone.marionette');
import TodoModel = require("./models/todo");
import TodoView = require("./views/todo_view");

class TodoApp extends Marionette.Application<TodoModel.Todo> {
  initialize(options) {
    this.on("start", function() {
      var todoCollection = new TodoModel.TodoCollection()
      var todoCollectionView = new TodoView.TodoCollectionView({collection: todoCollection});
      todoCollectionView.render();
      $("#content").append(todoCollectionView.el);
      todoCollection.fetch();
    });
  }
}

export = TodoApp;
