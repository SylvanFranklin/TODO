import { createSignal, batch, For } from "solid-js";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "solid-icons/im";
import { createLocalStore, removeIndex } from "./utils";
import { FaSolidTrashCan } from "solid-icons/fa";
import { Motion } from "@motionone/solid";

type TodoItem = { title: string; done: boolean };

const randomColor = (): string => {
  return ["bc4749", "f2e8cf", "386641", "6a994e", "a7c957"][
    Math.floor(Math.random() * 5)
  ];
};

export default function Index() {
  const [newTitle, setTitle] = createSignal("");
  const [todos, setTodos] = createLocalStore<TodoItem[]>("todos", []);

  const addTodo = (e: SubmitEvent) => {
    e.preventDefault();
    batch(() => {
      setTodos(todos.length, {
        title: newTitle(),
        done: false,
      });
      setTitle("");
    });
  };

  return (
    <main class="w-full flex font-mono">
      <div class="mx-auto mt-20  p-8 w-2/3">
        <form onSubmit={addTodo} class="flex flex-row">
          <input
            required
            class="outline-none w-full mx-auto text-3xl border-b-8"
            autofocus
            value={newTitle()}
            onInput={(e) => setTitle(e.currentTarget.value)}
          />
        </form>
        <div class="grid mt-20 space-y-4">
          <For each={todos}>
            {(todo, i) => (
              <div class="mx-auto flex flex-row rounded-md p-4 bg-gray-100">
                <input
                  class="font-bold font-mono text-3xl outline-none bg-transparent "
                  type="text"
                  value={todo.title}
                  onChange={(e) =>
                    setTodos(i(), "title", e.currentTarget.value)
                  }
                />
                <Motion.button
                  class={`mr-3 rounded-md`}
                  onClick={() => setTodos(i(), "done", !todo.done)}
                >
                  {todo.done ? (
                    <ImCheckboxChecked class="text-3xl" />
                  ) : (
                    <ImCheckboxUnchecked class="text-3xl" />
                  )}
                </Motion.button>
                <button
                  onClick={() => {
                    setTodos((t) => removeIndex(t, i()));
                  }}
                  class="text-red-500"
                >
                  <FaSolidTrashCan class="text-3xl" />
                </button>
              </div>
            )}
          </For>
        </div>
      </div>
    </main>
  );
}
