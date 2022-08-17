// styles
import './Login.css';

// hooks
import { useLogin } from '../../hooks/useLogin';
import { useState } from 'react';

const Login = () => {
  const { login, isPending, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
  }
  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)} value={email} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required onChange={(e) => setPassword(e.target.value)} value={password} />
        {!isPending && <button className="btn">Login</button>}
        {isPending && (
          <button className="btn" disabled>
            Loading
          </button>
        )}
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
};
export default Login;
