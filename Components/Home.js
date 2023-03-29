import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [availableBalance, setAvailableBalance] = useState("");
  const [actualBalance, setActualBalance] = useState("");
  const [display, setDisplay] = useState(false);
  const payload = {
    transaction_reference: "MP90023",
    transaction_code: "BIMM",
    amount: 0,
    narration: "Payment for order 8923",
    phone_number: "254706215505",
  };
  /**
   * @handleButtonClick
   * @response
   * @requestBody
   * @post
   * this function does the api call to get tha client balance
   */

  const handleButtonClick = async () => {
    // Here you can fetch the user's name and age from an API or a form
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/mobo/api/v1/get-balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      console.log("this is the respone " + json.narration);
      setAvailableBalance(json.available_balance);
      setActualBalance(json.actual_balance);
      setDisplay(true);
      if (json.available_balance == 500) {
        toast.success("success");
      } else {
        toast.error("an error occurred");
      }
    } catch (error) {
      toast.error("api error ");
      console.log("error occurred hehe" + error);

      // setResponse("An error occurred");
    }
  };
  return (
    <div className="main-page">
      <div className="home-heading">Welcome to Mobo.</div>
      <div className="check-balance">
        {" "}
        <h3>Check Balance to proceed</h3>
        <button onClick={handleButtonClick} className="btn">
          Get My Balance
        </button>
        <ToastContainer />
        {display && (
          <div>
            <p>Available Balance: {availableBalance}</p>
            <p>Actual Balance: {actualBalance}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
