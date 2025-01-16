import { Component } from "solid-js";

const Task: Component = () => {
  return (
    <div class={`flex w-full justify-items-start items-center p-2`}>
      <input type="checkbox" name="task" id="task" />
      <div class={`flex flex-col`}>
        <p>Task title</p>
        <p>Date</p>
      </div>
    </div>
  );
};

export default Task;
