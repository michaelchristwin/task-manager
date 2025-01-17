import { Component, createEffect, createSignal, Setter, Show } from "solid-js";
import Task from "../components/Task";
import { AiFillCloseCircle } from "solid-icons/ai";

const Tasks: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <div class={`w-full relative`}>
      <Show when={isOpen()}>
        <AddTaskDialog setIsOpen={setIsOpen} />
      </Show>
      <div
        class={`flex lg:w-[900px] md:w-[600px] w-full mx-auto items-center justify-between mt-[20px] px-2`}
      >
        <h1 class={`font-[700] text-[25px]`}>My Tasks</h1>
        <button
          type="button"
          onclick={() => setIsOpen((prev) => !prev)}
          class={`bg-primary w-[100px] text-black rounded-md flex justify-center items-center h-[30px]`}
        >
          Add Task
        </button>
      </div>

      <div
        class={`lg:w-[900px] md:w-[600px] w-full bg-[#292a2d] h-[600px] mx-auto mt-[70px] rounded-lg shadow-lg p-3 divide-y divide-gray-600`}
      >
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  );
};
export default Tasks;

interface AddTaskDialogProps {
  setIsOpen: Setter<boolean>;
}
const AddTaskDialog: Component<AddTaskDialogProps> = (props) => {
  const closeModal = () => props.setIsOpen(false);
  createEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  });
  return (
    <div
      aria-label="modal"
      class={`fixed top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-neutral-800 lg:w-[600px] lg:h-[600px] md:w-[500px] md:h-[500px] w-[300px] h-[300px]`}
    >
      <div class={`w-full h-full relative`}>
        <button
          aria-label="close modal"
          class={`rounded-full absolute top-[30px] right-[30px]`}
          onclick={closeModal}
        >
          <AiFillCloseCircle size={25} />
        </button>
      </div>
    </div>
  );
};
