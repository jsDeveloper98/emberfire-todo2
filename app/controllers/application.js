import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";

export default Controller.extend({
  inputValue: "",
  selectActive: "",
  filterName: "all",
  store: service(),

  init() {
    this._super(...arguments);
    const todos = this.get("store").findAll("todo");
    this.set("todos", todos);
  },

  filteredTodos: computed("filterName", "todos", function() {
    if (this.get("filterName") === "all") {
      return this.get("todos");
    } else {
      const filteredTodos = this.get("filterName") === "completed";
      return this.get("todos").filterBy("done", filteredTodos);
    }
  }),

  actions: {
    filterTodos(type) {
      this.set("filterName", type);
      this.set("selectActive", type);
    },
    removeCompleted() {
      this.get("todos").forEach(todo => {
        if (todo.done) {
          todo.destroyRecord();
          todo.save();
        }
      });
    }
  }
});
