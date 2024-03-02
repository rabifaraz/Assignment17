import FullPageLoader from "../components/FullPageLoader.jsx";
import { useState } from "react";
import { auth } from "../firebase/config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/usersSlice.js";
import { onAuthStateChanged } from "firebase/auth";
import GoogleButton from "react-google-button";

function LoginPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState("login");
  const [userCredentials, setuserCredentials] = useState({});
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with Google provider
      const result = await signInWithPopup(FirebaseAuth, provider);

      // Handle successful login
      console.log("Successfully logged in with Google", result);
    } catch (error) {
      // Handle errors
      console.error("Error during Google login:", error.message);
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        setUser({
          id: user.uid,
          email: user.email,
        })
      );
    } else {
      dispatch(setUser(null));
    }
  });

  function handleCredentials(e) {
    setuserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    // console.log(userCredentials);
  }

  function handleSignup(e) {
    e.preventDefault();
    setError("");

    // console.log("signup");
    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      // .then((userCredential) => {
      //   // Signed up
      //   console.log(userCredential.user);
      //   dispatch(
      //     setUser({
      //       id: userCredential.user.uid,
      //       email: userCredential.user.email,
      //     })
      //   );
      // })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        setError(error.message);
        // console.log(errorCode);
        // console.log(errorMessage);
        // ..
      });
  }

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      // .then((userCredential) => {
      //   // Signed in
      //   dispatch(
      //     setUser({
      //       id: userCredential.user.uid,
      //       email: userCredential.user.email,
      //     })
      //   );
      //   console.log(userCredential.user);

      //   // ...
      // })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handlePasswordReset() {
    const email = prompt("Please Enter a valid email address");
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert(
          "Password reset email has been sent. Check your inbox for further instructions"
        );
        // ..
      })
      .catch((error) => {
        console.log(error);
        // ..
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginType == "login") {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

  return (
    <>
      {isLoading && <FullPageLoader></FullPageLoader>}

      <div className="container login-page">
        <section>
          <h1>Welcome to the Online Store App</h1>
          <p>Login or create an account to continue</p>
          <div className="login-type">
            <button
              className={`btn ${loginType == "login" ? "selected" : ""}`}
              onClick={() => setLoginType("login")}
            >
              Login
            </button>
            <button
              className={`btn ${loginType == "signup" ? "selected" : ""}`}
              onClick={() => setLoginType("signup")}
            >
              Signup
            </button>
          </div>
          <form className="add-form login" onSubmit={handleSubmit}>
            <div className="form-control">
              <label>Email *</label>
              <input
                onChange={(e) => {
                  handleCredentials(e);
                }}
                required
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-control">
              <label>Password *</label>
              <input
                onChange={(e) => {
                  handleCredentials(e);
                }}
                type="password"
                required
                name="password"
                placeholder="Enter your password"
              />
            </div>
            <button className="active btn btn-block">
              {loginType == "login" ? "Login" : "Sign Up"}
            </button>
            {error && <div className="error">{error}</div>}
            {/* <GoogleButton onClick={handleGoogleLogin} /> */}
            <p onClick={handlePasswordReset} className="forgot-password">
              Forgot Password?
            </p>
          </form>
        </section>
      </div>
    </>
  );
}

export default LoginPage;
