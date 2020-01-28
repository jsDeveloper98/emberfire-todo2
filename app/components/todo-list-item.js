import Component from "@ember/component";
import { set } from "@ember/object";

export default Component.extend({
  actions: {
    saveTodo(todo) {
      set(todo, "done", !todo.done);
      todo.save();
    },
    removeTodo(todo) {
      todo.destroyRecord();
      todo.save();
    }
  }
});
