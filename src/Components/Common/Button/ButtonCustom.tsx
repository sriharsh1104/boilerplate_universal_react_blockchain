import "./ButtonCustom.scss";

/**COMMON BUTTON WITH DYNAMIC PROPS */
const ButtonCustom = (props: any) => {
  return (
    <button
      onClick={props?.onClick}
      type={props?.type}
      className={`btn-style ${props.className} ${props.fluid ? "w-100" : ""} ${
        props.transparent ? "transparent" : ""
      }`}
      disabled={props?.disabled}
    >
      {props.title}
      {props.btnIcon && <img src={props.btnIcon} alt="icon" className="" />}
      {props.onlyIcon && <span className="onlyIcon">{props.onlyIcon}</span>}
    </button>
  );
};

export default ButtonCustom;
