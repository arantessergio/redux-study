import React from "react";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { Todos } from "./features/todos";

const App = () => {
  return (
    <Provider store={store}>
      <Todos />
    </Provider>
  );
};

export default App;
