import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/sessionActions';

const LoginForm = (props) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  const updateField = (field) => {
    return (e) =>
      setForm({
        ...form,
        [field]: e.target.value,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      email: form.email,
      password: form.password,
    };

    dispatch(login(user));
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
              onChange={updateField('email')}
              placeholder="Email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={form.email}
              onChange={updateField('password')}
              placeholder="Password"
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

export default withRouter(LoginForm);
