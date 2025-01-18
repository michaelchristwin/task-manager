import type { Component } from "solid-js";
import { AiOutlineArrowRight } from "solid-icons/ai";
import styles from "../App.module.css";
import { A } from "@solidjs/router";

const Index: Component = () => {
  return (
    <div class={styles.App}>
      <div
        class={`flex flex-col justify-center items-center h-[600px] w-[600px] mx-auto space-y-[20px]`}
      >
        <h1 class={`text-primary text-[50px] font-[700]`}>TaskFlow</h1>
        <p class={`text-white text-[18px] font-[400]`}>
          Start organizing your tasks instantly or create an account to access
          them anywhere.
        </p>
        <div
          class={`flex w-full h-[50px] items-center justify-center space-x-[20px]`}
        >
          <A
            href="/tasks"
            class={`bg-primary w-[150px] hover:opacity-[0.9] h-[50px] flex justify-center items-center text-black rounded-md font-[400] space-x-1`}
          >
            <span>Try Now</span>
            <AiOutlineArrowRight size={20} />
          </A>
          <button
            class={`bg-white w-[150px] hover:opacity-[0.9] h-[50px] flex justify-center items-center text-black rounded-md font-[400]`}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
