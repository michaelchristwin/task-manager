import { Component, createEffect, createSignal, Setter, Show } from "solid-js";
import Task from "../components/Task";
import { AiFillCloseCircle } from "solid-icons/ai";
import { IoAddCircleOutline } from "solid-icons/io";

const Tasks: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <div class={`w-full relative`}>
      <Show when={isOpen()}>
        <AddTaskDialog setIsOpen={setIsOpen} />
      </Show>
      <Show when={isOpen()}>
        <div
          class={`fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.5)] z-10 backdrop-blur`}
        />
      </Show>
      <div
        class={`flex lg:w-[900px] md:w-[600px] w-full mx-auto items-center justify-between mt-[20px] px-2`}
      >
        <h1 class={`font-[700] text-[25px]`}>My Tasks</h1>
        <button
          type="button"
          onclick={() => setIsOpen((prev) => !prev)}
          class={`bg-primary w-[150px] text-black rounded-md flex justify-center items-center h-[35px] space-x-[6px] font-[400]`}
        >
          <IoAddCircleOutline size={20} />
          <span>Add Task</span>
        </button>
      </div>

      <div
        class={`lg:w-[900px] md:w-[600px] w-full bg-[#292a2d] h-[600px] mx-auto mt-[70px] rounded-lg shadow-lg p-3 divide-y divide-white/5`}
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
      class={`fixed top-[50%] z-20 right-[50%] translate-x-[50%] translate-y-[-50%] bg-neutral-800 lg:w-[600px] lg:h-[600px] md:w-[500px] md:h-[500px] w-[300px] h-[300px] rounded`}
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
