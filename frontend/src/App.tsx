/* @refresh reload */
import { lazy, ParentComponent } from "solid-js";
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { Toaster } from "solid-toast";
import "./index.css";
import Navbar from "./components/Navbar";

const Layout: ParentComponent = (props) => {
  return (
    <div>
      <Toaster />
      <Navbar />
      {props.children}
    </div>
  );
};

const routes = [
  {
    path: "/",
    component: lazy(() => import("./routes")),
  },
  {
    path: "/tasks",
    component: lazy(() => import("./routes/tasks")),
  },
  {
    path: "/login",
    component: lazy(() => import("~/routes/login")),
  },
  {
    path: "/signup",
    component: lazy(() => import("~/routes/signup")),
  },
];
const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(() => <Router root={Layout}>{routes}</Router>, root!);
