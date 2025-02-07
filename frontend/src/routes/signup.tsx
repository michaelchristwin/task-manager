import { Component } from "solid-js";

const Signup: Component = () => {
  return (
    <div class={`w-full p-[20px] flex justify-center`}>
      <div
        class={`lg:w-[500px] md:w-[400px] w-[300px] borde border-white/5 rounded-[10px] p-2 space-y-2`}
      >
        <p class={`text-[30px] font-bold text-center`}>
          Hello there👋, Sign Up here
        </p>
        <form class={`w-full space-y-[30px]`}>
          <div class={`w-full space-y-2`}>
            <fieldset>
              <label for="first_name" class={`text-[14px]`}>
                First Name
              </label>
              <input
                id="first_name"
                type="text"
                class={`w-full outline-none h-[40px] rounded text-white ps-2 bg-transparent border border-white/10`}
              />
            </fieldset>
            <fieldset>
              <label class={`text-[14px]`} for="last_name">
                Last Name
              </label>
              <input
                id="last_name"
                type="text"
                class={`w-full outline-none h-[40px] rounded text-white ps-2 bg-transparent border border-white/10`}
              />
            </fieldset>
            <fieldset>
              <label class={`text-[14px]`} for="email">
                Email
              </label>
              <input
                id="email"
                type="text"
                class={`w-full outline-none h-[40px] rounded text-white ps-2 bg-transparent border border-white/10`}
              />
            </fieldset>

            <fieldset class={``}>
              <label class={`text-[14px]`} for="password">
                Password
              </label>
              <input
                id="password"
                type="text"
                class={`w-full outline-none h-[40px] rounded text-white ps-2 bg-transparent border border-white/10`}
              />
            </fieldset>
          </div>
          <button
            class={`bg-primary rounded-[50px] w-[120px] h-[40px] flex justify-center items-center mx-auto text-neutral-900`}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
