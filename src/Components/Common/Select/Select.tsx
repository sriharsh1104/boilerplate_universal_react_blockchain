import React, { ReactNode } from "react";
import "./Select.scss";
import Select from "react-select";

type valueType = { value: string | number; label: string | ReactNode };
type propsType = {
  defaultValue?: valueType;
  onChange?: any;
  options?: valueType[];
  menuIsOpen?: boolean;
  className?: string;
  name?: string;
};

const CustomSelect = ({
  className,
  menuIsOpen,
  defaultValue,
  onChange,
  options,
  name,
}: propsType) => {
  return (
    <>
      <Select
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        className={`common_select ${className}`}
        classNamePrefix={"select"}
        menuIsOpen={menuIsOpen}
        name={name}
      />
    </>
  );
};

export default CustomSelect;
