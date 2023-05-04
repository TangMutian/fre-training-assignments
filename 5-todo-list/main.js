// MVC = Model View Controller
// View => user interface
// Model => retrieve data, store data, modify data & update the View
// Controller => manage data & handle users' actions

/** @typedef  {{id: number, title: string}} TodoItem */

const Api = (() => {
  return {
    async getData() {
      // use async for mock api call
      // fetch data from local storage
      let data = localStorage.getItem("todoList");
      if (data !== null) {
        /** @type {{todoList: [TodoItem], counter: number}} */
        const parsedData = JSON.parse(data);
        return parsedData;
      }
      // default list
      return {
        todoList: [
          {
            id: 1,
            title: "Something to do",
          },
          {
            id: 2,
            title: "Other things to do",
          },
        ],
        counter: 2,
      };
    },
    async putData(params) {
      localStorage.setItem("todoList", JSON.stringify(params));
    },
  };
})();

const View = (() => {
  const domSelector = {
    container: ".todo-container",
    inputBox: "#user-input",
    btn: "#addBtn",
  };

  const deleteEventTarget = document.createElement("template");

  const space = () => document.createTextNode(" ");
  return {
    domSelector,
    deleteEventTarget,
    /** @param {[TodoItem]} arr */
    creatTmpl(arr) {
      let template = document.createElement("div");
      arr.forEach(todo => {
        // template.innerHTML += `<li>
        //         <span>${todo.id}</span>
        //         <span>${todo.title}</span>
        //         <button id="del">Delete</button>
        //     </li>`;
        const li = document.createElement("li");
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        const btn = document.createElement("button");
        span1.innerText = todo.id;
        span2.innerText = todo.title;
        btn.innerText = "Done";
        li.append(span1, space(), span2, space(), btn);
        template.appendChild(li);

        btn.addEventListener("click", () => {
          const deleteEvent = new CustomEvent("delete", {
            detail: {
              id: todo.id,
            },
          });
          deleteEventTarget.dispatchEvent(deleteEvent);
        });
      });
      return template;
    },
    render(container, tmpl) {
      // container.replaceChildren(tmpl);
      container.innerHTML = "";
      container.appendChild(tmpl);
    },
  };
})();

const Model = ((api, view) => {
  const { domSelector, creatTmpl, render } = view;
  const { getData, putData } = api;

  const todoContainer = document.querySelector(domSelector.container);

  class State {
    /** @type {[TodoItem]} */
    #todoList;
    /** @type {number} */
    counter;

    constructor(list, counter) {
      this.#todoList = list;
      this.counter = counter;
    }

    #updateView() {
      let tmpl = creatTmpl(this.#todoList);
      render(todoContainer, tmpl);
      putData({
        todoList: this.#todoList,
        counter: this.counter,
      });
    }

    get todoList() {
      return this.#todoList;
    }

    set todoList(newList) {
      this.#todoList = newList;
      this.#updateView();
    }
  }

  return {
    State,
    getData,
    putData,
  };
})(Api, View);

const Controller = ((view, model) => {
  const { domSelector, deleteEventTarget } = view;
  const { State, getData, putData } = model;

  const state = new State();
  const init = () => {
    getData().then(data => {
      state.counter = data.counter;
      state.todoList = data.todoList;
    });
  };

  // Add event listeners
  const addTodo = () => {
    const userInput = document.querySelector(domSelector.inputBox);
    const btn = document.querySelector(domSelector.btn);

    btn.addEventListener("click", () => {
      let item = {
        title: userInput.value,
        id: ++state.counter,
      };
      const newList = [item, ...state.todoList];
      state.todoList = newList;
      userInput.value = "";
    });
  };
  const deleteTodo = () => {
    deleteEventTarget.addEventListener("delete", e => {
      const newList = state.todoList;
      const index = newList.findIndex(todo => todo.id === e.detail.id);
      newList.splice(index, 1);
      state.todoList = newList;
    });
  };

  return {
    bootstrap() {
      init();
      addTodo();
      deleteTodo();
    },
  };
})(View, Model);

Controller.bootstrap();
