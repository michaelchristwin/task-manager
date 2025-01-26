import { AiOutlineCalendar } from "solid-icons/ai";
import { toast } from "solid-toast";

const AddedToast = () => {
  toast.custom((t) => {
    return (
      <div
        class={`${
          t.visible ? "animate-enter" : "animate-leave"
        } fixed bottom-4 right-4 z-30 max-w-sm w-[290px] bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}
      >
        <div class="p-2">
          <div class="flex items-start">
            <div class="flex-shrink-0 pt-[2px] text-gray-600">
              <AiOutlineCalendar size={20} class={`text-green-500`} />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-green-500">Task Added</p>
              <p class="mt-1 text-sm text-gray-500">Refreshing tasks</p>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

const EditedToast = () => {
  toast.custom((t) => {
    return (
      <div
        class={`${
          t.visible ? "animate-enter" : "animate-leave"
        } fixed bottom-4 right-4 z-30 max-w-sm w-[290px] bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}
      >
        <div class="p-2">
          <div class="flex items-start">
            <div class="flex-shrink-0 pt-[2px] text-gray-600">
              <AiOutlineCalendar size={20} class={`text-yellow-500`} />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-yellow-500">Task Edited</p>
              <p class="mt-1 text-sm text-gray-500">Refreshing tasks</p>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

const DeletedToast = () => {
  toast.custom((t) => {
    return (
      <div
        class={`${
          t.visible ? "animate-enter" : "animate-leave"
        } fixed bottom-4 right-4 z-30 max-w-sm w-[290px] bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}
      >
        <div class="p-2">
          <div class="flex items-start">
            <div class="flex-shrink-0 pt-[2px] text-gray-600">
              <AiOutlineCalendar size={20} class={`text-red-500`} />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-red-500">Task Deleted</p>
              <p class="mt-1 text-sm text-gray-500">Refreshing tasks</p>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export { AddedToast, EditedToast, DeletedToast };
