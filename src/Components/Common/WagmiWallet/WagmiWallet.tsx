import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal, Web3NetworkSwitch } from "@web3modal/react";
import {
  configureChains,
  createClient,
  WagmiConfig,
  useAccount,
  useProvider,
  useDisconnect,
} from "wagmi";
import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  gnosis,
  mainnet,
  optimism,
  polygon,
  bscTestnet,
} from "wagmi/chains";
import { useDispatch } from "react-redux";
import {
  RemoveWallets,
  TOKEN_ADDRESS,
  WAGMI_WALLET_PROJECT_ID,
  WALLET_ORDER,
} from "../../../Constant";
import { getAccount, readContract } from "@wagmi/core";
import { useEffect } from "react";
import { walletAddress } from "../../../Redux/Slices/user.slice";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import UniversalProvider from "@walletconnect/universal-provider";
import Web3 from "web3";

// 1. Get projectID at https://cloud.walletconnect.com
if (!WAGMI_WALLET_PROJECT_ID) {
  throw new Error("You need to provide REACT_APP_PROJECT_ID env variable");
}
const projectId = WAGMI_WALLET_PROJECT_ID;

// 2. Configure wagmi client
const chains: any = [
  mainnet,
  polygon,
  avalanche,
  arbitrum,
  gnosis,
  bsc,
  optimism,
  fantom,
  bscTestnet,
];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);
export const wagmiProvider = async () => {
  // const provider = await EthereumProvider.init({
  //   projectId, // REQUIRED your projectId
  //   chains, // REQUIRED chain ids
  //   showQrModal: false, // REQUIRED set to "true" to use @web3modal/standalone,
  // });
  const provider: any = await UniversalProvider.init({
    logger: "info",
    // relayUrl: "ws://<relay-url>",
    projectId: WAGMI_WALLET_PROJECT_ID,
    metadata: {
      name: "React App",
      description: "React App for WalletConnect",
      url: "https://walletconnect.com/",
      icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },
    client: undefined, // optional instance of @walletconnect/sign-client
  });

  // console.log("provider", provider?.optionalNamespaces?.eip155?.rpcMap["97"]);
  // provider.setDefaultChain(
  //   `eip155:97`,
  //   provider?.optionalNamespaces?.eip155?.rpcMap["97"]
  // );

  // const web3 = new Web3(provider);

  return provider;
};

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
export default function WagmiWallet() {
  const dispatch = useDispatch();
  const status = useAccount();

  const walletStatus =
    status?.status == "connected" ? "connected" : "disconnected";

  useEffect(() => {
    if (walletStatus == "connected") {
      dispatch(walletAddress(status?.address));
      wagmiProvider();
    } else {
      dispatch(walletAddress(""));
    }
  }, [walletStatus]);

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Web3Button />
        <br />
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        explorerExcludedWalletIds={RemoveWallets}
        explorerRecommendedWalletIds={WALLET_ORDER}
        defaultChain={bscTestnet}
        tokenContracts={TOKEN_ADDRESS}

        // themeMode={"dark"}

        // themeVariables={{
        //   "--w3m-font-family": "Roboto, sans-serif",
        //   "--w3m-accent-color": "#F5841F",
        // }}
      />
    </>
  );
}
