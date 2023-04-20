import Web3 from "web3";
import DynamicABI from "../Abi/DynamicABI.json";
import IcoAbi from "../Abi/Ico.ABI.json";

/**ADDRESS FOR INSTANCE */
import { RPC_URL, CHAIN_ID, USDT_ADDRESS, ICO_ADDRESS } from "../Constant";
import { wagmiProvider } from "../Components/Common/WagmiWallet/WagmiWallet";

let web3Instance: any, icoInstance: any;

const callWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    const { ethereum } = window;
    const provider: any = await wagmiProvider();
    // const chainId = await newInstance.eth.getChainId();
    // console.log("chainId", chainId);
    /**CHECK SELECTED NETWORK IS CORRECT OR NOT */
    // if (CHAIN_ID == chainId) {
    /**CREATE INSTANCE WITH METAMASK */
    console.log("web3Instance", web3Instance, provider);
    let web3Instancefirst = new Web3(provider);
    web3Instance = new Web3(web3Instancefirst.givenProvider);

    const chainId = await web3Instance.eth.getChainId();
    console.log("chainId", chainId);
    // } else {
    /**CREATE INSTANCE WITH RPC */
    //   web3Instance = new Web3(RPC_URL);
    // }
    resolve(web3Instance);
    return web3Instance;
  });
};

export const createInstance = async () => {
  let web3: any = await callWeb3();

  /**CREATE CONTRACT INSTANCE WITH ABI */
  icoInstance = new web3.eth.Contract(IcoAbi, ICO_ADDRESS);
  return true;
};

createInstance();

/**SEND CONTRACT TYPE AND DYAMIC ADDRESS(OPTIONAL) FOR GET CONTRACT INSTANCE*/
export const getContractInstance = async (
  abi: string,
  dynamicAddress: string
) => {
  return new Promise(async (resolve, reject) => {
    // switch (contractType) {
    //   case "ico":
    //     return icoInstance
    //       ? resolve(icoInstance)
    //       : createInstance()
    //           .then(() => {
    //             resolve(icoInstance);
    //           })
    //           .catch(reject);
    //   case "dynamic":
    //     let dynamicInstance = (await callWeb3())
    //       ? await new web3Instance.eth.Contract(DynamicABI,     )
    //       : await createInstance().then(async () => {
    //           return await new web3Instance.eth.Contract(
    //             DynamicABI,
    //             dynamicAddress
    //           );
    //         });
    //     resolve(dynamicInstance);
    //     break;
    //   default:
    //     return null;
    // }

    let web3: any = await callWeb3();
    let instance = new web3.eth.Contract(abi, dynamicAddress);
    console.log("web3=====", instance);
    resolve(instance);
    return instance;
  });
};

/**CALL CONTRACT GET METHODS. ALL PARAMS WILL BE DYNAMIC */
export const callGetMethod = async (
  method: string,
  data: any,
  abi: any,
  //   contractType: string,
  dynamicAddress: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      /**GET SELECTED CONTRACT INSTANCE */
      console.log(
        "prototypeerror",
        abi,
        dynamicAddress,
        Array.prototype.slice.call(data)
      );

      let contract: any = await getContractInstance(abi, dynamicAddress);
      console.log("contract", contract);
      if (contract.methods) {
        /**CALL GET METHOD */
        contract.methods[method]
          .apply(null, Array.prototype.slice.call(data))
          .call()
          .then((result: object) => {
            resolve(result);
          })
          .catch((error: Error) => {
            reject(error);
          });
      } else {
        reject(new Error("Contract not found."));
      }
    } catch (error) {
      console.log("prototypeerror", error);
      reject(error);
    }
  });
};

/**CALL CONTRACT SEND METHODS. ALL PARAMS WILL BE DYNAMIC */
export const callSendMethod = async (
  method: string,
  data: any,
  walletAddress: string,
  abi: any,
  value: any,
  dynamicAddress: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      /**CHECK WALLET IS CONNECTED */
      if (walletAddress === "") {
        reject(new Error("Please connect wallet"));
      }

      /**CREATE DATA FOR CALL SEND METHOD */
      let dataForSend: any = { from: walletAddress };

      /**CHECK IF WE NEED TO SEND VALUE IN SEND METHOD */
      if (value) {
        dataForSend.value = value;
      }

      /**GET SELECTED CONTRACT INSTANCE */
      let contract: any = await getContractInstance(abi, dynamicAddress);

      /**CHECK IF WE NEED TO GIVE APPROVAL TO CONTRACT FOR TOKEN */
      if (method === "buyTokens" && data[1] !== 1) {
        let allowanceRes = await giveTokenAllowance({
          walletAddress,
          tokenAddress: USDT_ADDRESS,
          contract: ICO_ADDRESS,
        });
        if (!allowanceRes) {
          return false;
        }
      }
      if (contract.methods) {
        /**ESTIMATE GAS FOR TRANSACTION */
        const gasLimit = await contract.methods[method]
          .apply(null, Array.prototype.slice.call(data))
          .estimateGas(dataForSend);
        dataForSend.gasLimit = gasLimit;

        /**CALL SEND METHOD */
        contract.methods[method]
          .apply(null, Array.prototype.slice.call(data))
          .send(dataForSend)
          .then((result: object) => {
            resolve(result);
          })
          .catch((error: Error) => {
            reject(error);
          });
      } else {
        reject(new Error("Contract not found."));
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**FUNCTION FOR GIVE ALLOWANCE TO CONTRACT FOR TOKEN SPEND */
const giveTokenAllowance = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      /**GET SELECTED CONTRACT INSTANCE */
      let allowance: any = await callGetMethod(
        "allowance",
        [data.walletAddress, data.contract],
        "dynamic",
        data.tokenAddress
      );

      /**CHECK ALLOWANCE IS ALREADY GIVEN OR NOT */
      if (parseInt(allowance) === 0) {
        /**SET ALLOWANCE VALUE AS 10**40 */
        // let maxlimit = BigNumber(10).power(40);
        let maxlimit: any = Web3.utils
          .toBN(10)
          .pow(Web3.utils.toBN(40))
          .toString();

        /**CALL SEND METHOD */
        let allowanceRes: any = await callSendMethod(
          "approve",
          [data.contract, maxlimit],
          data.walletAddress,
          "dynamic",
          null,
          data.tokenAddress
        );
        if (!(allowanceRes && allowanceRes.status)) {
          return false;
        }
      }
      resolve(allowance);
    } catch (error) {
      reject(error);
    }
  });
};
