import { Component, createEffect, createSignal, Show } from "solid-js";
import { AiOutlineCalendar } from "solid-icons/ai";
import { BsThreeDotsVertical } from "solid-icons/bs";
import EditTaskDialog from "./modals/EditTask";
import DeleteTaskDialog from "./modals/DeleteTask";
import { getApiURL } from "~/utils";
import { EditedToast } from "./custom.toasts";

export type Priority = "low" | "medium" | "high";

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  due_date: string;
  priority: Priority;
  refetch: () => any;
}

const Task: Component<TaskProps> = (props) => {
  const date = new Date(props.due_date);
  let menuRef!: HTMLDivElement;
  let buttonRef!: SVGSVGElement;
  const [menuOPen, setMenuOpen] = createSignal(false);
  const [editOpen, setEditOpen] = createSignal(false);
  const [deleteOpen, setDeleteOpen] = createSignal(false);
  const formattedDate = date.toISOString().slice(0, 10);
  createEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        menuRef &&
        !menuRef.contains(event.target as Node) &&
        buttonRef &&
        !buttonRef.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
  });
  const priorityColors = {
    low: "border-green-500",
    medium: "border-yellow-500",
    high: "border-red-500",
  };

  const handleCheck = async (e: MouseEvent) => {
    e.preventDefault();

    const data = {
      title: props.title,
      description: props.description,
      due_date: props.due_date,
      priority: props.priority,
      completed: true,
    };

    try {
      await fetch(`${getApiURL()}s/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      EditedToast();
      props.refetch();
    } catch (error) {
      // Handle error if needed
      console.error("Failed to submit:", error);
    } finally {
    }
  };

  return (
    <div
      class={`flex w-[85%] mx-auto justify-around space-x-4 items-center p-5 h-[100px] relative`}
    >
      <Show when={editOpen()}>
        <EditTaskDialog setIsOpen={setEditOpen} {...props} />
      </Show>
      <Show when={deleteOpen()}>
        <DeleteTaskDialog setIsOpen={setDeleteOpen} {...props} />
      </Show>
      <Show when={editOpen() || deleteOpen()}>
        <div
          class={`fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.5)] z-10 backdrop-blur`}
        />
      </Show>
      <input
        type="checkbox"
        disabled={props.completed}
        name="task"
        id="task"
        onclick={handleCheck}
        checked={props.completed}
        class={`w-[20px] h-[20px] outline-none border border-gray-300 rounded-full`}
      />
      <div class={`flex flex-col w-[200px]`}>
        <p class={`text-[19px] text-primary font-[600]`}>{props.title}</p>
        <p class={`text-[13px]`}>{props.description}</p>
      </div>
      <div class={`flex items-center space-x-2 w-[120px] justify-center`}>
        <AiOutlineCalendar size={20} />
        <p class={`text-[16px]`}>{formattedDate}</p>
      </div>
      <div class={`w-[110px] flex justify-center items-center`}>
        <div
          class={`w-fit px-[15px] h-[30px] text-[14px] rounded-full border flex justify-center items-center ${
            priorityColors[props.priority]
          }`}
        >
          {props.priority}
        </div>
      </div>
      <BsThreeDotsVertical
        ref={buttonRef}
        onClick={() => setMenuOpen((prev) => !prev)}
        size={25}
        aria-label="options button"
        class={`hover:cursor-pointer`}
      />
      <Show when={menuOPen()}>
        <div
          ref={menuRef}
          class={`absolute right-[-130px] bottom-[-100px] mt-2 w-48 bg-white rounded-lg shadow-lg`}
        >
          <ul class="py-1 text-black">
            <li
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onclick={() => setEditOpen((prev) => !prev)}
            >
              Edit
            </li>
            <li
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setDeleteOpen((p) => !p)}
            >
              Delete
            </li>
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Share</li>
          </ul>
        </div>
      </Show>
    </div>
  );
};

export default Task;
