import React, { useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

function MainPage(): JSX.Element {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState<IIsHover>({
    greet: false,
    iam: false,
    name: false,
  });

  const handleMouseEnter = (field: string) => {
    setIsHover((prev) => ({ ...prev, [field]: true }));
  };

  const handleMouseLeave = (field: string) => {
    setIsHover((prev) => ({ ...prev, [field]: false }));
  };

  const handleGoPage = (field: string) => {
    navigate(`/${field}`);
  };

  return (
    <section className="main-container">
      <article className="main-content">엘렐레</article>
    </section>
  );
}

export interface IIsHover {
  greet: boolean;
  iam: boolean;
  name: boolean;
}

export default MainPage;
