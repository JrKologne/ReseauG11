import React, { useState } from "react";
import AnimateHeight from "react-animate-height";
import { FunctionExpression } from "typescript";

type Props = {
  children: JSX.Element | Array<JSX.Element>;
  open?: boolean;
  close:any;
};
export default function Accordion({
  children,
  open ,
  close
}: Props) {

  return (
    <div className="relative">
      <button
        className="accordion_button w-full"
        onClick={() => close(!open)}>
        
      </button>
      <AnimateHeight
        id={"sliding_wrapper"}
        duration={300}
        height={open ? "auto" : 0}>
        {children}
      </AnimateHeight>
    </div>
  );
}