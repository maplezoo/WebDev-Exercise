import React, { useState } from "react";

function App() {
  let now = new Date().toLocaleTimeString("en-US", { hour12: false });
  const [time, setTime] = useState(now);

  function getTime() {
    let newTime = new Date().toLocaleTimeString("en-US", { hour12: false });
    setTime(newTime);
  }

  setInterval(getTime, 1000);

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={getTime}>Get Time</button>
    </div>
  );
}

export default App;
