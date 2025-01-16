import { useState } from 'react';
import Image from 'next/image';


import styles from './LoginForm.module.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        {/* Left Side - Desktop */}
        <div className={styles.leftBox}>
          <Image
            src="/logos/image_20250103_14 (2).png"
            alt="Construction Logo"
            width={200}
            height={150}
         
            priority
          />
          <div>
            <h1>Welcome Back...</h1>
            <h2>Ready To Be Onboard?</h2>
          </div>
        </div>

        {/* Left Side - Tablet */}
        <div className={styles.leftBoxResponsive}>
          <div>
            <h1>Welcome Back...</h1>
            <h2>Ready To Be Onboard?</h2>
          </div>
          <Image
            src="/placeholder.svg"
            alt="Construction Logo"
            width={100}
            height={50}
            priority
          />
        </div>

        {/* Right Side */}
        <div className={styles.rightBox}>
          {/* Mobile Header */}
          <div className={styles.rightBoxHeader}>
            <h3>Login</h3>
            <Image
              src="/placeholder.svg"
              alt="Construction Logo"
              width={80}
              height={40}
              priority
            />
          </div>

          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="text@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="........."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

