import { Component } from "solid-js";
import Task from "../components/Task";

const Tasks: Component = () => {
  return (
    <div class={`w-full`}>
      <div
        class={`flex lg:w-[900px] md:w-[600px] w-full mx-auto items-center justify-between mt-[20px] px-2`}
      >
        <h1 class={`font-[700] text-[25px]`}>My Tasks</h1>
        <button
          type="button"
          class={`bg-primary w-[100px] text-black rounded-md flex justify-center items-center h-[30px]`}
        >
          Add Task
        </button>
      </div>

      <div
        class={`lg:w-[900px] md:w-[600px] w-full bg-[#292a2d] h-[600px] mx-auto mt-[70px] rounded-lg shadow-lg p-3`}
      >
        <Task />
      </div>
    </div>
  );
};
export default Tasks;
