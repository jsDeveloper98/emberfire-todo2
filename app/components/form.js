import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  inputValue: "",
  store: service(),

  init() {
    this._super(...arguments);
    const todos = this.get("store").findAll("todo");
    this.set("todos", todos);
  },

  actions: {
    addTodo(value, event) {
      if (event.key === "Enter" && this.get("inputValue") !== "") {
        const todo = this.get("store").createRecord("todo", {
          title: this.get("inputValue"),
          done: false
        });
        this.set("inputValue", "");
        todo.save();
      }
    },
    doneAllTodos() {
      this.get("todos").forEach(todo => {
        if (todo.done === false) {
          todo.done = true;
          todo.save();
        }
      });
    }
  }
});
