import { A } from "@solidjs/router";
import { Component } from "solid-js";

const Navbar: Component = () => {
  return (
    <nav class={`flex items-center justify-between p-2 h-[50px]`}>
      <A href="/" class={"text-primary font-[700] text-[25px]"}>
        ☯
      </A>
      {/* <A
        type="button"
        href="/signup"
        class={`text-black w-[100px] h-[40px] flex justify-center items-center bg-white rounded-lg`}
      >
        Sign Up
      </A> */}
    </nav>
  );
};
export default Navbar;
