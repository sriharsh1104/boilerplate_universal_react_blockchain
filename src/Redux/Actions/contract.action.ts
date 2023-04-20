import toaster from "../../Components/Common/Toast";
import { connectmetamask } from "./user.action";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
  callGetMethod,
  callSendMethod,
  createInstance,
} from "../../Services/contract.service";
import { getError } from "../../Services/common.service";
import { loader } from "../Slices/loader.slice";
import abi from "../../Abi/DynamicABI.json";

/**CALL COONTRACT'S GET METHODS */
export const callContractGetMethod = (
  method: string,
  data: any = [],
  abi: any,
  loading = true,
  dynamicAddress: string = "",
  showError: boolean = true
) => {
  return async (dispatch: Dispatch<any> = useDispatch()) => {
    try {
      /**SHOW LOADING */
      if (loading) dispatch(loader(true));

      /**CALL GET METHOD */
      const result = await callGetMethod(method, data, abi, dynamicAddress);
      if (loading) dispatch(loader(false));
      return result;
    } catch (error) {
      if (loading) dispatch(loader(false));
      return showError ? toaster.error(getError(error)) : null;
    }
  };
};

/**CALL COONTRACT'S SEND METHODS */
export function callContractSendMethod(
  method: string,
  data: any = [],
  walletAddress: string,
  abi: any,
  value: string = "",
  dynamicAddress: string = ""
) {
  return async (dispatch: Dispatch<any> = useDispatch(), getState: any) => {
    try {
      let wallet = getState().user.wallet;
      let verifyAccount: any = false;

      /**VALIDATE WALLET */
      if (wallet === "MetaMask") {
        verifyAccount = await dispatch(connectmetamask());
      }
      if (wallet !== "MetaMask" || (wallet === "MetaMask" && verifyAccount)) {
        /**SHOW LOADING */
        dispatch(loader(true));

        /**CREATE INSTANCE WITH WALLET */
        const contractInstance = await createInstance();
        if (contractInstance) {
          /**CALL SEND METHOD */
          const result = await callSendMethod(
            method,
            data,
            walletAddress,
            // contractType,
            abi,
            value,
            dynamicAddress
          );
          dispatch(loader(false));
          return result;
        } else {
          /**IF ANY ERROR IN CREATING INSTANCE */
          dispatch(loader(false));
          return toaster.error(
            "Some error occurred during contract interaction. Please reload the page."
          );
        }
      }
    } catch (error) {
      dispatch(loader(false));
      return toaster.error(getError(error));
    }
  };
}
