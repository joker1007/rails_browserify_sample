/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../models/todo.ts" />

declare function require(name: string): any;

import jQuery = require('jquery');
import Backbone = require('backbone');
import TodoModel = require('../models/todo');
import Marionette = require('backbone.marionette');
Backbone.$ = jQuery;
var todoTemplate = require('../templates/todo.hbs');

export class TodoView extends Marionette.ItemView<TodoModel.Todo> {
  template = todoTemplate;
  initialize(options) {
    this.el = null;
    this.id = "todo-" + this.model.id.toString();
    this.className = "todo";
    this.tagName = "li";
    this.events = <any>{
      "change .is_done_checkbox" : "doIt",
      "click .destroy" : "destroyTodo"
    };
    this.listenTo(this.model, "change:is_done", this.renderStatus);

    this._ensureElement();
  }

  onRender() {
    var $isDone = this.$(".is_done_checkbox");
    if (this.model.get("is_done")) {
      $isDone.prop('checked', true);
    } else {
      $isDone.prop('checked', false);
    }

    this.renderStatus();
  }

  doIt() {
    var $isDone = this.$(".is_done_checkbox");
    if ($isDone.prop('checked')) {
      this.model.set({"is_done": true});
    } else {
      this.model.set({"is_done": false});
    }
    this.model.save();
  }

  destroyTodo() {
    if (confirm("本当に削除しますか？")) {
      this.model.destroy();
    }
  }

  renderStatus() {
    if (this.model.get("is_done")) {
      this.$el.addClass("is_done");
    } else {
      this.$el.removeClass("is_done");
    }
  }
}

export class TodoCollectionView extends Marionette.CollectionView<TodoModel.Todo> {
  childView = TodoView;

  initialize(options) {
    this.el = null;
    this.tagName = "ul";
    this._ensureElement();
  }
}
