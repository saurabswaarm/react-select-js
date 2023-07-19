import PropTypes from "prop-types";
// import { useState } from "react";
import { components } from "react-select";

const Option = (props) => {
  // const specialOption = props.value === '__select_all__' || props.value === '__delselect_all__';
  // const [specialChecked, setSpecialChecked] = useState(false);

  return (
    <div>
      <components.Option {...props}>
        {/* {specialOption ?  */}
        {/* <input
          type="checkbox"
          checked={specialChecked}
          onChange={()=> setSpecialChecked((state)=>!state)}
        />  */}
        {/* :  */}
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        {/* } */}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

Option.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value:PropTypes.string
};

export default Option;
