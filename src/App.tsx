import "./Global.scss";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Application from "./Application";
import { Toaster } from "react-hot-toast";
import Loader from "./Components/Common/Loader";

/**CREATE STORE PERSIST INSTANCE */
let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <Loader />
        <Application />
      </PersistGate>
    </Provider>
  );
}

export default App;
