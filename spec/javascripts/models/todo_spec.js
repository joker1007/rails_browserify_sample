/// <reference path="../../../app/assets/typings/tsd.d.ts" />
/// <reference path="../../../app/assets/typings/power-assert.d.ts" />
var assert = require('power-assert');
var TodoModel = require('../../../app/assets/javascripts/models/todo');

describe("Todo", function () {
    it("create", function () {
        var todo = new TodoModel.Todo({ id: 1, title: "TodoTitle", is_done: true });
        assert(todo.get("title") == "TodoTitle");
    });
});
