/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./models/todo.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
var TodoModel = require("./models/todo");
var TodoView = require("./views/todo_view");

var TodoApp = (function (_super) {
    __extends(TodoApp, _super);
    function TodoApp() {
        _super.apply(this, arguments);
    }
    TodoApp.prototype.initialize = function (options) {
        this.on("start", function () {
            var todoCollection = new TodoModel.TodoCollection();
            var todoCollectionView = new TodoView.TodoCollectionView({ collection: todoCollection });
            todoCollectionView.render();
            $("#content").append(todoCollectionView.el);
            todoCollection.fetch();
        });
    };
    return TodoApp;
})(Marionette.Application);

module.exports = TodoApp;
