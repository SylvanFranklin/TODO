import { createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";

interface Item {
  title: string;
  desc?: string;
  completed?: boolean;
}

function Item(props: { item: Item }) {
  const [completed, setCompleted] = createSignal(
    props.item.completed ? true : false
  );

  return (
    <li
      class="flex flex-row border-4 rounded-md p-4 w-full border-black mt-4"
      onClick={() => setCompleted(!completed())}
    >
      <h2 class="my-auto text-3xl font-bold">{props.item.title}</h2>
      <button
        class={`aspect-square border-2 border-black w-10 h-10 my-auto ml-auto ${
          completed() ? "bg-black" : "bg-white"
        }`}
      ></button>
    </li>
  );
}

export default function Home() {
  const [items, setItems] = createStore([]);
  const [formValue, setFormValue] = createSignal("");
  const addTODO = (e: SubmitEvent) => {
    e.preventDefault();
    setItems([...items, { title: formValue() }]);
    setFormValue("");
  };

  return (
    <main class="w-full mt-20">
      <div class="w-1/2 mx-auto p-4">
        <form class="mb-3 flex flex-row" onSubmit={(e) => addTODO(e)}>
          <input
            type="text"
            value={formValue()}
            onInput={(e) => setFormValue(e.currentTarget.value)}
            class="text-2xl border-b-2 w-full outline-none pt-4"
            autofocus
          />
          <button
            type="submit"
            class="bg-slate-800 p-4 text-white font-bold text-2xl ml-3"
          >
            Submit
          </button>
        </form>
        <For each={items}>{(item: Item) => <Item item={item} />}</For>
      </div>
    </main>
  );
}
