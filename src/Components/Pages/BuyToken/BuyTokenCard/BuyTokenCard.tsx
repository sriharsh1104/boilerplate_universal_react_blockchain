import React from "react";
import "./BuyTokenCard.scss";

const BuyTokenCard = (props: {
  icon: string | undefined;
  name:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  total:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <div className="dashboard_card">
      <div className="dashboard_card_inner">
        <div className="dashboard_card_inner_header">
          <span className="token_icon">
            <img src={props.icon} alt="" />
          </span>
          <h4>Total Tokens ({props.name})</h4>
        </div>
        <div className="dashboard_card_inner_body">
          <h3>{props.total}</h3>
        </div>
      </div>
    </div>
  );
};

export default BuyTokenCard;
