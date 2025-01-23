import { Component } from "solid-js";
import { AiOutlineCalendar } from "solid-icons/ai";
import { BsThreeDotsVertical } from "solid-icons/bs";

export type Priority = "low" | "medium" | "high";

export interface TaskProps {
  title: string;
  description: string;
  completed: boolean;
  due_date: string;
  priority: Priority;
}

const Task: Component<TaskProps> = (props) => {
  const date = new Date(props.due_date);
  const formattedDate = date.toISOString().slice(0, 10);
  const priorityColors = {
    low: "border-green-500",
    medium: "border-yellow-500",
    high: "border-red-500",
  };
  return (
    <div
      class={`flex w-[85%] mx-auto justify-around space-x-4 items-center p-5 h-[100px]`}
    >
      <input
        type="checkbox"
        name="task"
        id="task"
        class={`w-[20px] h-[20px] outline-none border border-gray-300 rounded-full`}
      />
      <div class={`flex flex-col`}>
        <p class={`text-[19px] text-primary font-[600]`}>{props.title}</p>
        <p class={`text-[13px]`}>{props.description}</p>
      </div>
      <div class={`flex items-center space-x-2`}>
        <AiOutlineCalendar size={20} />
        <p class={`text-[16px]`}>{formattedDate}</p>
      </div>
      <div
        class={`w-[100px] h-[40px] rounded-full border flex justify-center items-center ${
          priorityColors[props.priority]
        }`}
      >
        {props.priority}
      </div>
      <BsThreeDotsVertical
        size={25}
        aria-label="options button"
        class={`hover:cursor-pointer`}
      />
    </div>
  );
};

export default Task;
