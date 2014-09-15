/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../models/todo.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var jQuery = require('jquery');
var Backbone = require('backbone');

var Marionette = require('backbone.marionette');
Backbone.$ = jQuery;
var todoTemplate = require('../templates/todo.hbs');

var TodoView = (function (_super) {
    __extends(TodoView, _super);
    function TodoView() {
        _super.apply(this, arguments);
        this.template = todoTemplate;
    }
    TodoView.prototype.initialize = function (options) {
        this.el = null;
        this.id = "todo-" + this.model.id.toString();
        this.className = "todo";
        this.tagName = "li";
        this.events = {
            "change .is_done_checkbox": "doIt",
            "click .destroy": "destroyTodo"
        };
        this.listenTo(this.model, "change:is_done", this.renderStatus);

        this._ensureElement();
    };

    TodoView.prototype.onRender = function () {
        var $isDone = this.$(".is_done_checkbox");
        if (this.model.get("is_done")) {
            $isDone.prop('checked', true);
        } else {
            $isDone.prop('checked', false);
        }

        this.renderStatus();
    };

    TodoView.prototype.doIt = function () {
        var $isDone = this.$(".is_done_checkbox");
        if ($isDone.prop('checked')) {
            this.model.set({ "is_done": true });
        } else {
            this.model.set({ "is_done": false });
        }
        this.model.save();
    };

    TodoView.prototype.destroyTodo = function () {
        if (confirm("本当に削除しますか？")) {
            this.model.destroy();
        }
    };

    TodoView.prototype.renderStatus = function () {
        if (this.model.get("is_done")) {
            this.$el.addClass("is_done");
        } else {
            this.$el.removeClass("is_done");
        }
    };
    return TodoView;
})(Marionette.ItemView);
exports.TodoView = TodoView;

var TodoCollectionView = (function (_super) {
    __extends(TodoCollectionView, _super);
    function TodoCollectionView() {
        _super.apply(this, arguments);
        this.childView = TodoView;
    }
    TodoCollectionView.prototype.initialize = function (options) {
        this.el = null;
        this.tagName = "ul";
        this._ensureElement();
    };
    return TodoCollectionView;
})(Marionette.CollectionView);
exports.TodoCollectionView = TodoCollectionView;
