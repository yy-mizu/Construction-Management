import { useState } from "react";
import Image from "next/image";

import styles from "./LoginForm.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required.";
    if (!emailRegex.test(email)) return "Invalid email format.";
    return "";
  };

  const validatePassword = (password) => {
    if (!password.trim()) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
    } else {
      setErrors({ email: "", password: "" });
      // Handle login logic here (e.g., API call)
      console.log("Form submitted:", { email, password });
      alert("Login Successful!");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        {/* Left Side - Desktop */}
        <div className={styles.leftBox}>
          <Image
            src="/logos/Main_logo.png"
            alt="Construction Logo"
            width={240}
            height={210}
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
            src="/logos/Main_logo.png"
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
              src="/logos/Main_logo.png"
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
                type="text"
                id="email"
                placeholder="text@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}
            </div>

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
