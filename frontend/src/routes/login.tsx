import { Component, createSignal } from "solid-js";
import { getLoginURL } from "~/utils";

type User = {
  email: string;
  password: string;
};
const Login: Component = () => {
  const [formState, setFormState] = createSignal<User>({
    email: "",
    password: "",
  });

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      await fetch(getLoginURL(), {
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

  return (
    <div class={`w-full p-[20px] flex justify-center`}>
      <div
        class={`lg:w-[500px] md:w-[400px] w-[300px] borde border-white/5 rounded-[10px] p-2 space-y-2`}
      >
        <p class={`text-[30px] font-bold text-center`}>Login</p>
        <form class={`w-full space-y-[30px]`} onSubmit={handleSubmit}>
          <div class={`w-full space-y-2`}>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
