import React from "react";
import { useAppContext } from "../../App";
import './index.css';

function Buttons({ handleSummaryUpdate,disabled }) {
  /* 
    * buttons component handles the  page change for the application
      go back minuses the page number while next increments , the maximium increment is 4 before it resets to 0.
   */
  const { page, dispatch } = useAppContext();
  function handlePageUpdate() {
    if(disabled) return;
    handleSummaryUpdate();
    if (page === 4) {
      dispatch({ type: "page", payload: 0 });
      return;
    }
    dispatch({ type: "page", payload: page + 1 });
  }
  return (
    <div className="btn__container">
      {page > 1 && (
        <a
          className="btn btn__regular"
          onClick={() => {
            dispatch({ type: "page", payload: page - 1 });
          }}
        >
          Go Back
        </a>
      )}
      <a
        className={`btn ${page === 4 ? "btn__light__blue" : "btn__blue"} ${disabled ? "btn__disabled":""}`}
        onClick={() => {
          handlePageUpdate();
        }}
      >
        {page === 4 ? "Confirm" : "Next Step"}
      </a>
    </div>
  );
}

export default Buttons;
