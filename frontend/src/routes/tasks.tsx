import { Component, createSignal, Show } from "solid-js";
import Task from "../components/Task";
import AddTaskDialog from "../components/AddTask";

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
