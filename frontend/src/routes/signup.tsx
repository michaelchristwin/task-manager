import { A } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import { getSignupURL } from "~/utils";

type User = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

const Signup: Component = () => {
  const [formState, setFormState] = createSignal<User>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      await fetch(getSignupURL(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState()),
      });
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
    }
  };

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  console.log(formState());
  return (
    <div class={`w-full p-[20px] flex justify-center`}>
      <div
        class={`lg:w-[500px] md:w-[400px] w-[300px] borde border-white/5 rounded-[10px] p-2 space-y-2`}
      >
        <p class={`text-[30px] font-bold text-center`}>
          Hello there👋, Sign up here
        </p>
        <form class={`w-full space-y-[30px]`} onSubmit={handleSubmit}>
          <div class={`w-full space-y-2`}>
            <fieldset class={`space-y-1`}>
              <label for="first_name" class={`text-[14px]`}>
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                onChange={handleChange}
                value={formState().first_name}
                class={`w-full outline-none h-[50px] rounded text-white ps-2 bg-transparent border border-white/10`}
              />
            </fieldset>
            <fieldset class={`space-y-1`}>
              <label class={`text-[14px]`} for="last_name">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                value={formState().last_name}
                onChange={handleChange}
                class={`w-full outline-none h-[50px] rounded text-white ps-2 bg-transparent border border-white/10`}
              />
            </fieldset>
            <fieldset class={`space-y-1`}>
              <label class={`text-[14px]`} for="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                value={formState().email}
                class={`w-full outline-none h-[50px] rounded text-white ps-2 bg-transparent border border-white/10`}
              />
            </fieldset>

            <fieldset class={`space-y-1`}>
              <label class={`text-[14px]`} for="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                value={formState().password}
                class={`w-full outline-none h-[50px] rounded text-white ps-2 bg-transparent border border-white/10`}
              />
            </fieldset>
          </div>
          <button
            type="submit"
            class={`bg-primary rounded-[50px] w-[120px] h-[40px] flex justify-center items-center mx-auto text-neutral-900`}
          >
            Sign Up
          </button>
        </form>
        <A
          href="/login"
          class={`mx-auto block w-fit text-[14px] hover:underline text-blue-600 cursor-pointer`}
        >
          Already have an account, login
        </A>
      </div>
    </div>
  );
};

export default Signup;
