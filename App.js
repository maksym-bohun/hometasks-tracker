import { store } from "./store/store";
import { Provider } from "react-redux";
import Main from "./Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
