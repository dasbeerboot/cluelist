import React, { Suspense } from "react";
import "./index.scss";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function MainLayout(): JSX.Element {
  return (
    <main className="main-layout-container">
      <Header />
      <section className="main-contents-container">
        <Suspense fallback={<div>loading</div>}>
          <Outlet />
        </Suspense>
      </section>
    </main>
  );
}

export default MainLayout;
