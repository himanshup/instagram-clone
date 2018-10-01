import React from "react";
import { css } from "react-emotion";
import { FadeLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 200px;
  text-align: center;
`;

const Loader = () => {
  return (
    <div className="sweet-loading">
      <FadeLoader
        className={override}
        sizeUnit={"px"}
        size={100}
        color={"#003569"}
      />
    </div>
  );
};

export default Loader;
