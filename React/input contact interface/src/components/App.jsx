import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setContact((p) => {
      switch (name) {
        case "email":
          return { email: value, fName: p.fName, lName: p.lName };
        case "fName":
          return { email: p.email, fName: value, lName: p.lName };
        case "lName":
          return { email: p.email, fName: p.fName, lName: value };
        default:
          break;
      }
    });
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input
          onChange={handleChange}
          name="fName"
          placeholder="First Name"
          value={contact.fName}
        />
        <input
          onChange={handleChange}
          name="lName"
          placeholder="Last Name"
          value={contact.lName}
        />
        <input
          onChange={handleChange}
          name="email"
          placeholder="Email"
          value={contact.email}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
