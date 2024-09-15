import React from "react";
import ReactDom from "react-dom";
const MODAL_STYLE = {
  position: "fixed",
  top: "6%",
  left: "5%",
  backgroundColor: "rgb(34,34,34)",
  tranform: "translate(-50%,-50%)",
  zIndex: 1000,
  height: "90%",
  width: "90%",
};
const OVERLAY_STYLE = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rbga(0,0,0,.7)",
  zIndex: 1000,
};
export default function Model({children,onClose}) {
  return ReactDom.createPortal(<>
<div style={OVERLAY_STYLE}>
  <div style={MODAL_STYLE}>
    <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" style={{marginLeft:'90%',marginTop:'-35px'}} onClick={onClose}>X</button>
    {children}
  </div>
</div>
  </>,document.getElementById('cart-root'))
}
