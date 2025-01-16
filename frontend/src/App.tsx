/* @refresh reload */
import { lazy, ParentComponent } from "solid-js";
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import "./index.css";
import Navbar from "./components/Navbar";

const Layout: ParentComponent = (props) => {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
};

const routes = [
  {
    path: "/",
    component: lazy(() => import("./routes/Index")),
  },
  {
    path: "/tasks",
    component: lazy(() => import("./routes/Tasks")),
  },
];
const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(() => <Router root={Layout}>{routes}</Router>, root!);
