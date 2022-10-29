import { useEffect } from "react";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem("attemptLeft") === null) {
      localStorage.setItem("attemptLeft", 3);
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
