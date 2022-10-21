import "./App.css";
import React from "react";
import { useCallback, useState } from "react";
function App() {
  const Button = React.memo(({ handleClick, name }) => {
    console.log(`${name} rendered`);
    return <button onClick={handleClick}>{name}</button>;
  });

  const Counter = () => {
    // counter rendered every time it runs
    console.log("counter rendered");
    const [countOne, setCountOne] = useState(0);
    const [countTwo, setCountTwo] = useState(0);
    const memoizedSetCountOne = useCallback(
      () => setCountOne(countOne + 1),
      [countOne]
    );
    // This will give me back a function that can be called later on.
    const memoizedSetCountTwo = useCallback(
      () => setCountTwo(countTwo + 1),
      [countTwo]
    );
    // whenever we click on either button, we will see this in the console
    // counter rendered
    // button1 rendered
    // counter rendered
    // button2 rendered
    return (
      <>
        {countOne} {countTwo}
        <Button handleClick={memoizedSetCountOne} name="button1" />
        <Button handleClick={memoizedSetCountTwo} name="button2" />
      </>
    );
  };

  return <Counter />;
}
// we have applied memoization to our button component, and the prop values that are passed to it are seen as equal. The two handleClick functions are cached and will be seen as the same function by React until the value of and item in the dependency array changes.
export default App;
