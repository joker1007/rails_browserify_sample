/// <reference path="../../typings/tsd.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var jQuery = require('jquery');
var Backbone = require('backbone');
Backbone.$ = jQuery;

var Todo = (function (_super) {
    __extends(Todo, _super);
    function Todo() {
        _super.apply(this, arguments);
        this.urlRoot = "/todos";
    }
    return Todo;
})(Backbone.Model);
exports.Todo = Todo;

var TodoCollection = (function (_super) {
    __extends(TodoCollection, _super);
    function TodoCollection() {
        _super.apply(this, arguments);
        this.model = Todo;
        this.url = "/todos";
    }
    return TodoCollection;
})(Backbone.Collection);
exports.TodoCollection = TodoCollection;
