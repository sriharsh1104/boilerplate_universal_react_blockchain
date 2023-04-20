import { Dispatch, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApiGetMethod } from "../../../Redux/Actions/api.action";
import { Container, Form } from "react-bootstrap";
import ButtonCustom from "../../Common/Button/ButtonCustom";
import InputCustom from "../../Common/Inputs/InputCustom";
import toaster from "../../Common/Toast";
import {
  convertWithDecimal,
  divideWithDecimal,
} from "../../../Services/common.service";
import Web3 from "web3";
import { TOKEN_ADDRESS, RPC_URL, USDT_ADDRESS } from "../../../Constant";
import {
  callContractGetMethod,
  callContractSendMethod,
} from "../../../Redux/Actions/contract.action";
import useDebounce from "../../../hooks/useDebounce";
import "../LandingPage/LandingPage.scss";
import CustomSelect from "../../Common/Select/Select";
import CommonHeading from "../../Common/CommonHeading/CommonHeading";
import "./BuyToken.scss";
import dynamiAbi from "../../../Abi/DynamicABI.json";
import icoAbi from "../../../Abi/Ico.ABI.json";
import { getContractInstance } from "../../../Services/contract.service";

const BuyToken = () => {
  /**CREATE DISPATCH OBJECT */
  const dispatch: Dispatch<any> = useDispatch();

  /**GET STATES FROM STORE */
  const walletAddress = useSelector((state: any) => state.user?.walletAddress);
  const bnbDecimals = useSelector((state: any) => state.ico?.bnbDecimals);
  const usdtDecimals = useSelector((state: any) => state.ico?.usdtDecimals);

  /**DECLARE VARIABLES */
  const [payOption, setPayOption] = useState<any>(1);
  const [amount, setAmount] = useState<any>(0);
  const [balance, setBalance] = useState<any>(0);
  const [tokenSymbol, setTokenSymbol] = useState<any>("");

  const [calToken, setCalToken] = useState(0);
  useDebounce(() => handeGetCalToken(), 1000, [amount]);

  useEffect(() => {
    const getProducts = async () => {
      /**EXAMPLE FOR API CALL WITH DUMMY PARMS */
      const products: any = await dispatch(
        callApiGetMethod("GETPRODUCTS", { status: true, limit: 10 })
      );
      console.log("products :>> ", products);
    };
    getProducts();
  }, [dispatch]);

  useEffect(() => {
    /**GET USER BALANCE */
    getUserBalance();
    handeGetCalToken();
    handleGetTokenSymbol();
    // eslint-disable-next-line
  }, [payOption]);

  const handleGetTokenSymbol = async () => {
    const result = await dispatch(
      callContractGetMethod("symbol", [], dynamiAbi, false, TOKEN_ADDRESS)
    );
    setTokenSymbol(result);
  };

  const handeGetCalToken = async () => {
    let result: any = await dispatch(
      callContractGetMethod(
        "calculateTokens",
        [
          payOption,
          convertWithDecimal(
            amount,
            parseInt(payOption) === 1 ? bnbDecimals : usdtDecimals
          ),
        ],
        icoAbi,
        false
      )
    );
    setCalToken(result._totalTokens);
  };

  /**METHOD FOR BUY TOKEN */
  const BuyToken = async (event: any) => {
    event.preventDefault();

    /**CHECK WALLET IS CONNECTED OR NOT */
    if (!walletAddress) {
      toaster.error("Please connect your wallet ");
      return false;
    }

    /**GET VLAUE WITH DECIMAL FOR CONTRACT CALL */
    let amountForBuy: any = await convertWithDecimal(
      amount,
      parseInt(payOption) === 1 ? bnbDecimals : usdtDecimals
    );

    /**CHECK USER HAVE BALANCE FOR BUY OR NOT */
    let userBalance = await getUserBalance();
    if (parseFloat(userBalance) < parseFloat(amountForBuy)) {
      toaster.error(
        `Insufficient balance of ${parseInt(payOption) === 1 ? "BNB" : "USDT"}`
      );
      return false;
    }

    /**CALL CONRACT SEND METHOD FOR BUY */
    let result: any = await dispatch(
      callContractSendMethod(
        "buyTokens",
        [amountForBuy, payOption],
        walletAddress,
        icoAbi,
        parseInt(payOption) === 1 ? amountForBuy : null
      )
    );
    if (result && result.status) {
      getUserBalance();
      setAmount("");
      toaster.success("Token bought successfully");
    }
  };

  /**GET USER BALANCE */
  const getUserBalance = async () => {
    if (walletAddress) {
      let balance: any = "";
      let mainBalance: any = "";
      if (parseInt(payOption) === 2) {
        /**GET USER UTDT BALANCE BY DYNAMIC ABI AND  USDT_ADDRESS */
        mainBalance = await dispatch(
          callContractGetMethod(
            "balanceOf",
            [walletAddress],
            dynamiAbi,
            false,
            USDT_ADDRESS
          )
        );
        balance = await divideWithDecimal(mainBalance, usdtDecimals);
      } else if (parseInt(payOption) === 1) {
        /**GET USER BNB BALANCE */
        let web3Instance = new Web3(RPC_URL);
        mainBalance = await web3Instance.eth.getBalance(walletAddress);
        balance = await divideWithDecimal(mainBalance, bnbDecimals);
      }
      setBalance(balance);
      return mainBalance;
    }
  };

  const buytoken = async (event: any) => {
    event.preventDefault();
    const abi: any = dynamiAbi;
    const contract: any = await getContractInstance(
      abi,
      "0x93aa5b199127887bd0099b7e0a97648b20d0d450"
    );
    const respomseBlockchain = contract.methods
      .mint("0x25973cCb6906caB985C8c00021630EE340723998", "10000000000000000000")
      .send({ from: "0x25973cCb6906caB985C8c00021630EE340723998" });
    console.log("contract", respomseBlockchain);
  };

  return (
    <Container fluid>
      <section className="dashboard">
        <div className="dashboard_box">
          {/* <h1>Buy Token</h1> */}
          <CommonHeading heading="Buy Token" />
          <Form onSubmit={buytoken}>
            <Form.Group className="buy_token" controlId="formBasicEmail">
              <InputCustom
                type="number"
                label="Enter Amount"
                className="mb-0 max-field"
                placeholder="0.0"
                Fstar="*"
                infoclass="d-none"
                value={amount ? amount : ""}
                step={"any"}
                name="amount"
                autoFocus={true}
                onChange={(e: any) =>
                  setAmount(e.target.value ? e.target.value : 0)
                }
                required
                min={0}
                maxlength={10}
              >
                <div className="SelectValue">
                  <CustomSelect
                    defaultValue={{ value: 1, label: "BNB" }}
                    onChange={(option: { value: any }) =>
                      setPayOption(option?.value)
                    }
                    options={[
                      { value: 1, label: "BNB" },
                      { value: 2, label: "USDT" },
                    ]}
                  />
                </div>
              </InputCustom>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <span className="baclanceAmount">
                Balance : {balance} {parseInt(payOption) === 1 ? "BNB" : "USDT"}
              </span>
              <span className="baclanceAmount">
                You Get : {calToken} {tokenSymbol}
              </span>
            </div>
            <ButtonCustom title="Buy" type="submit" className="buyBtn" />
          </Form>
        </div>
      </section>
    </Container>
  );
};

export default BuyToken;
