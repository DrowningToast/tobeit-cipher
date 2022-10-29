import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Lock = () => {
  const [attempts, setAttempts] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setAttempts(localStorage.getItem("attemptLeft"));

    const timeout = setTimeout(() => {
      router.push("/");
      localStorage.setItem(
        "attemptLeft",
        localStorage.getItem("attemptLeft") - 1
      );
    }, 7000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen relative bg-red-700 grid place-items-center text-5xl font-bold font-tech">
      {/* <Confetti className="absolute inset-0" /> */}

      <h1 className="text-white">{`Incorrect, You've ${
        attempts - 1
      } attempt(s) left`}</h1>
    </div>
  );
};

export default Lock;
