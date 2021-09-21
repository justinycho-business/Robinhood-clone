import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import '.././styles/Signup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const userData = {firstName, lastName, username, email, password}
      const data = await dispatch(signUp(userData));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords must match.'])
    }
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='row'>
      <div className='column-1'>
      </div>
      <div class="column-2">
    <form classname='login-form' onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='input-div'>
        <label className='form-label'>First Name</label>
        <input
          type='text'
          name='firstName'
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        ></input>
      </div>
      <div className='input-div'>
        <label class='form-label'>Last Name</label>
        <input
          type='text'
          name='lastName'
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        ></input>
      </div>
      <div className='input-div'>
        <label class='form-label'>User Name</label>
        <input
          type='text'
          name='username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></input>
      </div>
      <div className='input-div'>
        <label class='form-label'>Email</label>
        <input
          type='text'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      <div className='input-div'>
        <label class='form-label'>Password</label>
        <input
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <div className='input-div'>
        <label class='form-label'>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className='login-form-btn' type='submit'>Sign Up</button>
    </form>
    </div>
    </div>
  );
};

export default SignUpForm;
