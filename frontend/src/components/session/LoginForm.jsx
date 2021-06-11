import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      token
      loggedIn
    }
  }
`;


const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      const {token} = data.login
      console.log(token)
      localStorage.setItem("auth-token", token)
      window.history.href = '/tweets';
    }
  });
  const errors = useSelector((state) => state.errors.session);

  const updateField = (field) => {
    return (e) =>
      setForm({
        ...form,
        [field]: e.target.value,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { email: form.email, password: form.password } });
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
              value={form.password}
              onChange={updateField('password')}
              placeholder="Password"
              className="input input-bordered"
            />
          </div>

          <input
            type="submit"
            value="Submit"
            className="mt-4 btn btn-primary"
          />
          {renderErrors()}
        </div>
      </form>
    </section>
  );
};

export default withRouter(LoginForm);
