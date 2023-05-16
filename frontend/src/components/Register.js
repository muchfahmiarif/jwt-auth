import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault(); // while on submit page will not refresh
    try {
      await axios.post(`http://localhost:5000/users`, {
        name: name,
        email: email,
        password: passowrd,
        confirmPassword: confirmPassword,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        // setMsg(error.response.data.message);
        setMessage(error.response.data.message); // message from backend
      }
    }
  };

  return (
    <div>
      <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4-desktop">
                <form action="" onSubmit={Register} className="box">
                  <p className="has-text-centered">{message}</p>
                  <div className="field mt-5">
                    <label htmlFor="" className="label">
                      Name
                    </label>
                    <div className="controls">
                      <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <label htmlFor="" className="label">
                      Email
                    </label>
                    <div className="controls">
                      <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <label htmlFor="" className="label">
                      Password
                    </label>
                    <div className="controls">
                      <input type="password" className="input" placeholder="******" value={passowrd} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <label htmlFor="" className="label">
                      Confirm Password
                    </label>
                    <div className="controls">
                      <input
                        type="password"
                        className="input"
                        placeholder="******"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button className="button is-success is-fullwidth">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
