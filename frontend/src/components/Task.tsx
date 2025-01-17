import { Component } from "solid-js";
import { AiOutlineCalendar } from "solid-icons/ai";

const Task: Component = () => {
  return (
    <div
      class={`flex w-full justify-items-start items-center p-5 space-x-4 h-[100px]`}
    >
      <input
        type="checkbox"
        name="task"
        id="task"
        class={`w-[20px] h-[20px] outline-none border border-gray-300 rounded-full`}
      />
      <div class={`flex flex-col`}>
        <p class={`text-[19px]`}>Buy bread from the cornerstore</p>
        <div class={`flex items-center space-x-2`}>
          <AiOutlineCalendar size={18} />
          <p class={`text-[14px]`}>2025-01-17</p>
        </div>
      </div>
    </div>
  );
};

export default Task;
