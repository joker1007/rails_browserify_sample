/// <reference path="../../typings/tsd.d.ts" />

import jQuery = require('jquery');
import Backbone = require('backbone');
Backbone.$ = jQuery;

export class Todo extends Backbone.Model {
  urlRoot = "/todos";
}

export class TodoCollection extends Backbone.Collection<Todo> {
  model = Todo;
  url = "/todos";
}
