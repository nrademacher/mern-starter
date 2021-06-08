import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../actions/sessionActions";

const SignupForm = (props) => {
  const signedIn = useSelector((state) => state.session.isSignedIn);
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    handle: "",
    password: "",
    password2: "",
  });
  const { history } = props;

  useEffect(() => {
    if (signedIn) {
      history.push("/login");
    }
  }, [signedIn, history]);

  const update = (field) => {
    return (e) =>
      setForm({
        ...form,
        [field]: e.currentTarget.value,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      email: form.email,
      handle: form.handle,
      password: form.password,
      password2: form.password2,
    };

    dispatch(signUp(user));
  };

  const renderErrors = () => {
    return (
      <ul className="mt-2 text-error">
        {Object.keys(errors).map((error, i) => (
          <li key={`error-${i}`}>{errors[error]}</li>
        ))}
      </ul>
    );
  };

  return (
    <section className="place-items-center mt-[10vh]">
      <form onSubmit={handleSubmit}>
    <div className="w-[95vw] md:w-[30vw] mx-auto">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={update('email')}
              placeholder="Email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Handle</span>
            </label>
            <input
              type="text"
              value={form.handle}
              onChange={update('handle')}
              placeholder="Handle"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={form.password}
              onChange={update('password')}
              placeholder="Password"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={form.password2}
              onChange={update('password2')}
              placeholder="Confirm Password"
              className="input input-bordered"
            />
          </div>
          <input type="submit" value="Submit" className="mt-4 btn btn-primary" />
          {renderErrors()}
        </div>
      </form>
    </section>
  );
};

export default withRouter(SignupForm);
