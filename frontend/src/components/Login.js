import React from "react";

const Login = () => {
  return (
    <div>
      <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4-desktop">
                <form action="" className="box">
                  <div className="field mt-5">
                    <label htmlFor="" className="label">
                      Email or Password
                    </label>
                    <div className="controls">
                      <input type="text" className="input" placeholder="username" />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <label htmlFor="" className="label">
                      Password
                    </label>
                    <div className="controls">
                      <input type="password" className="input" placeholder="******" />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button className="button is-success is-fullwidth">Login</button>
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

export default Login;
