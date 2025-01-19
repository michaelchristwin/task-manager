import { AiFillCloseCircle } from "solid-icons/ai";
import { Component, createEffect, createSignal, For, Setter } from "solid-js";

interface AddTaskDialogProps {
  setIsOpen: Setter<boolean>;
}
const AddTaskDialog: Component<AddTaskDialogProps> = (props) => {
  const closeModal = () => props.setIsOpen(false);
  const [activePriority, setActivePriority] = createSignal<string>("Low");
  createEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  });

  const priorities = () => ["Low", "Medium", "High"];

  return (
    <div
      aria-label="modal"
      class={`fixed top-[50%] z-20 right-[50%] translate-x-[50%] translate-y-[-50%] bg-neutral-800 lg:w-[600px] lg:h-[600px] md:w-[500px] md:h-[500px] w-[300px] h-[300px] rounded`}
    >
      <div class={`w-full h-full relative flex justify-center `}>
        <button
          aria-label="close modal"
          class={`rounded-full absolute top-[30px] right-[30px]`}
          onclick={closeModal}
        >
          <AiFillCloseCircle size={25} />
        </button>
        <form action="" class={`w-[80%] space-y-4 mt-[100px]`}>
          <h2 class={`text-[25px] font-bold text-primary`}>Add Task</h2>
          <fieldset class={`space-y-1 w-full`}>
            <label for="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              class={`w-full outline-none h-[40px] rounded text-neutral-800 ps-2`}
            />
          </fieldset>
          <fieldset class={`space-y-1 w-full`}>
            <label for="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              class={`w-full outline-none h-[40px] rounded text-neutral-800 ps-2`}
            />
          </fieldset>
          <div class="space-y-2 w-full">
            <p>Priority</p>
            <div
              class={`flex justify-start items-center w-full h-[40px] space-x-2`}
            >
              <For each={priorities()}>
                {(priority) => (
                  <button
                    type="button"
                    class={`px-4 py-2 rounded-[10px] border border-white/10 ${
                      activePriority() === priority
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                    onclick={() => setActivePriority(priority)}
                  >
                    {priority}
                  </button>
                )}
              </For>
            </div>
          </div>
          <button
            type="submit"
            class={`w-[100px] h-[40px] flex justify-center items-center rounded-[8px] bg-primary text-neutral-800 mx-auto`}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskDialog;
