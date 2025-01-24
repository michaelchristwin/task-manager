import { AiFillCloseCircle } from "solid-icons/ai";
import { ImSpinner2 } from "solid-icons/im";
import { Component, createEffect, createSignal, For, Setter } from "solid-js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Priority, TaskProps } from "~/components/Task";
import { EditedToast } from "~/components/custom.toasts";
import { reload } from "@solidjs/router";
import { capitalize, areAllPropertiesTruthy } from "~/utils";

interface EditTaskDialogProps extends TaskProps {
  setIsOpen: Setter<boolean>;
}
interface FormState {
  title: string;
  description: string;
  due_date: string;
  priority: Priority;
}

dayjs.extend(utc);
dayjs.extend(timezone);

//Add Task Component
const EditTaskDialog: Component<EditTaskDialogProps> = (props) => {
  const priorities = () => ["low", "medium", "high"];
  const closeModal = () => props.setIsOpen(false);

  const formattedNow = dayjs().format("YYYY-MM-DDTHH:mm");

  const [formState, setFormState] = createSignal<FormState>({
    title: props.title,
    description: props.description,
    due_date: dayjs(props.due_date).format("YYYY-MM-DDTHH:mm"),
    priority: props.priority,
  });

  createEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  });

  const [isLoading, setIsLoading] = createSignal(false);

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when starting

    const data = {
      title: formState().title,
      description: formState().description,
      due_date:
        dayjs(formState().due_date).format("YYYY-MM-DDTHH:mm:ss") +
        "." +
        (dayjs(formattedNow).millisecond() * 1000).toString().padStart(6, "0") +
        dayjs(formattedNow).format("Z"),

      priority: formState().priority,
    };

    try {
      await fetch(`http://localhost:8080/api/tasks/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      props.setIsOpen(false);
      EditedToast();
      reload();
    } catch (error) {
      // Handle error if needed
      console.error("Failed to submit:", error);
    } finally {
      setIsLoading(false); // Reset loading state whether successful or not
    }
  };

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
        <form
          action=""
          class={`w-[80%] space-y-4 mt-[80px]`}
          onsubmit={handleSubmit}
        >
          <h2 class={`text-[25px] font-bold text-primary`}>Add Task</h2>
          <fieldset class={`space-y-1 w-full`}>
            <label for="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onchange={handleChange}
              value={formState().title}
              class={`w-full outline-none h-[40px] rounded text-neutral-800 ps-2`}
            />
          </fieldset>
          <fieldset class={`space-y-1 w-full`}>
            <label for="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={formState().description}
              onchange={handleChange}
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
                    name="priority"
                    class={`px-4 py-2 rounded-[10px] border border-white/10 ${
                      formState().priority === priority
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                    onclick={() =>
                      setFormState((prev) => ({
                        ...prev,
                        priority: priority as "low" | "medium" | "high",
                      }))
                    }
                  >
                    {capitalize(priority)}
                  </button>
                )}
              </For>
            </div>
          </div>
          <fieldset class={`space-y-1 w-full`}>
            <label for="due date">Due Date</label>
            <input
              type="datetime-local"
              name="due_date"
              onchange={handleChange}
              min={formattedNow}
              value={formState().due_date}
              id="due_date"
              class={`w-full outline-none h-[40px] rounded text-neutral-800`}
            />
          </fieldset>
          <button
            disabled={!areAllPropertiesTruthy(formState())}
            type="submit"
            class={`add-task-btn rounded-[8px] bg-primary text-neutral-800 mx-auto p-2 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span
              class={`add-task mx-auto ${
                isLoading() ? "invisible" : "visible"
              }`}
            >
              Add Task
            </span>
            <span
              class={`spinner flex ${
                isLoading() ? "visible" : "invisible"
              } items-center justify-center space-x-1`}
            >
              Adding Task
              <ImSpinner2
                class={`animate-spin mx-auto text-neutral-900`}
                size={20}
              />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskDialog;
