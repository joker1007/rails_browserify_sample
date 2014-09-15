/// <reference path="../typings/tsd.d.ts" />

import jQuery = require('jquery');
import Backbone = require('backbone');

(function($) {
  var _sync = Backbone.sync;

  Backbone.sync = function(method: string, model: any, options: any) {
    var beforeSend = options.beforeSend;

    // Set X-CSRF-Token HTTP header
    options.beforeSend = function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
      if (beforeSend) return beforeSend.apply(this, arguments);
    };

    // Serialize data, optionally using paramRoot
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      options.contentType = 'application/json';
      var data = {};
      if (model.paramRoot) {
        data[model.paramRoot] = model.toJSON(options);
      } else {
        data = model.toJSON();
      }
      options.data = JSON.stringify(data);
    }

    return _sync(method, model, options);
  };

})(jQuery);

import app = require('./todo_app');
declare var TodoApp;
TodoApp = app;
