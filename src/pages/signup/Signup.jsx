// styles
import './Signup.css';

// hooks
import { useState, useEffect } from 'react';
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const { isPending, error, signup } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!thumbnailError && !passwordError) {
      signup(displayName, email, password, thumbnail);
    }
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError('Please select a file');
      return;
    } else if (!selected.type.includes('image')) {
      setThumbnailError('Please select a valid image file');
      return;
    } else if (selected.size > 100000) {
      setThumbnailError('Please select a file less than 100kb');
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [confirmPassword, password]);

  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)} value={email} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required onChange={(e) => setPassword(e.target.value)} value={password} />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
        {passwordError && <span>password must match!</span>}
        <label htmlFor="displayName">Display Name</label>
        <input type="text" name="displayName" id="displayName" required onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
        <label htmlFor="thumbnail">Icon</label>
        <input type="file" name="thumbnail" id="thumbnail" required onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
        {!isPending && <button className="btn">Signup</button>}
        {isPending && (
          <button className="btn" disabled>
            Loading
          </button>
        )}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};
export default Signup;
