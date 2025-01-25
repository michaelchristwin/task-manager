import { AiFillCloseCircle } from "solid-icons/ai";
import { ImSpinner2 } from "solid-icons/im";
import { Component, createEffect, createSignal, For, Setter } from "solid-js";
import { DeletedToast } from "~/components/custom.toasts";

interface AddTaskDialogProps {
  setIsOpen: Setter<boolean>;
  refetch: () => any;
  id: string;
}

//Delete Task Component
const DeleteTaskDialog: Component<AddTaskDialogProps> = (props) => {
  const closeModal = () => props.setIsOpen(false);

  createEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  });

  const [isLoading, setIsLoading] = createSignal(false);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when starting

    try {
      await fetch(`/api/tasks/${props.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      props.setIsOpen(false);
      DeletedToast();
      props.refetch();
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
      class={`fixed top-[50%] z-20 right-[50%] translate-x-[50%] translate-y-[-50%] bg-neutral-800 lg:w-[500px] w-[300px] h-[250px] rounded py-3 px-[25px]`}
    >
      <div class={`w-full h-full relative flex justify-center p-3`}>
        <button
          aria-label="close modal"
          class={`rounded-full absolute top-[5px] right-[10px]`}
          onclick={closeModal}
        >
          <AiFillCloseCircle size={25} />
        </button>
        <form class={`mt-[20px] space-y-7 w-full`} onsubmit={handleSubmit}>
          <h2 class={`font-bold text-[21px] text-cente`}>Delete Task</h2>
          <p class={`text-[17px]`}>
            Are you sure you want to delete this task?
          </p>
          <button
            type="submit"
            class={`add-task-btn rounded-[8px] bg-red-500 hover:opacity-[0.7] text-white mx-auto p-2 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span
              class={`add-task mx-auto ${
                isLoading() ? "invisible" : "visible"
              }`}
            >
              Delete Task
            </span>
            <span
              class={`spinner flex ${
                isLoading() ? "visible" : "invisible"
              } items-center justify-center space-x-1`}
            >
              Deleting Task
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

export default DeleteTaskDialog;
