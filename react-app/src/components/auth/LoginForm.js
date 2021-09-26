import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import '.././styles/LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));

    if (data) {
      setErrors(data);

    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/dashboard/${user.id}`} />;
  }

  const demoUserLogin = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'))

  };

  return (
    <div className='row'>
      <div className='column-1'>
      </div>
      <div class="column-2">
        <form classname='login-form'>
          <label className='login-title'> Welcome to Mr. Hood </label>
          <div className='input-div'>
            <label htmlFor='email' className='form-label'>Email or username</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='input-div'>
            <label htmlFor='password' class='form-label'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
        </form>
        <div className='errors'>

          {errors.length > 0 ? (
            <div>
              <p><i class="fas fa-exclamation-circle"></i> Unable to log in with provided credentials.</p>
            </div>
          ) : (
            <p></p>
          )}
        </div>
        <div className='login-form-btn-container'>
          <button type='submit' className='login-form-btn' onClick={onLogin}>Sign In</button>
          <button type='submit' className='login-form-btn' onClick={demoUserLogin}>Demo</button>
        </div>
      </div>
    </div >
  );
};

export default LoginForm;
