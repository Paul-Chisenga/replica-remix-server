import { useEffect, useState } from "react";

function CounterNum() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 20);
    if (count === 100) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className={count === 100 ? "preloader active" : "preloader"}>
      <div className={count === 100 ? "hide" : ""}>
        <span className="counter">{count}</span>
      </div>
    </div>
  );
}

function Preloader() {
  return <CounterNum />;
}
export default Preloader;
