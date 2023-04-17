import "./Global.scss";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Application from "./Application";
import { Toaster } from "react-hot-toast";
import Loader from "./Components/Common/Loader";

/**CREATE STORE PERSIST INSTANCE */
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  gnosis,
  mainnet,
  optimism,
  polygon,
} from "wagmi/chains";

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.REACT_APP_PROJECT_ID) {
  throw new Error("You need to provide REACT_APP_PROJECT_ID env variable");
}
const projectId = process.env.REACT_APP_PROJECT_ID;

// 2. Configure wagmi client
const chains = [
  mainnet,
  polygon,
  avalanche,
  arbitrum,
  gnosis,
  bsc,
  optimism,
  fantom,
];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 2, chains, projectId }),
  provider,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains);
let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WagmiConfig client={wagmiClient}>
          {/* <Web3Button /> */}
          <br />
          <Toaster />
          <Loader />
          <Application />
        </WagmiConfig>

        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </PersistGate>
    </Provider>
  );
}

export default App;
