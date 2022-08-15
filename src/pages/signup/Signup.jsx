// styles
import './Signup.css';

// hooks
import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);
  };

  return (
    <div>
      <form className='auth-form'>
        <h2>Sign up</h2>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' required onChange={(e) => setEmail(e.target.value)} value={email} />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' required onChange={(e) => setPassword(e.target.value)} value={password} />
        <label htmlFor='displayName'>Display Name</label>
        <input type='text' name='displayName' id='displayName' required onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
        <label htmlFor='thumbnail'>Icon</label>
        <input type='file' name='thumbnail' id='thumbnail' required onChange={handleFileChange} />
        <button className='btn'>Signup</button>
      </form>
    </div>
  );
};
export default Signup;
