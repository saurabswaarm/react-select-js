import { useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { AsyncPaginate } from "react-select-async-paginate";
import Option from "./components/Option";

const EnhancedSelect = ({loadurl}) => {
  const [value, setValue] = useState(null);
  let [options, setOptions] = useState([]);

  const [allSelected, setAllSelected] = useState([false, 0]);

  useEffect(() => {
    if (value !== null && typeof value === "object") {
      if (value.length < allSelected[1]) {
        setAllSelected([false, 0]);
      }

      if (value.length === options.length - 2) {
        setAllSelected([true, value.length]);
      }
    }
  }, [value, options, allSelected]);

  async function loadOptions(search, loadedOptions, { page }) {
    const response = await fetch(
      // eslint-disable-next-line react/prop-types
      loadurl(page)
      // 
    );
    const data = await response.json();

    let options = data.data.map((passenger) => ({
      value: passenger._id,
      label: passenger.name,
    }));

    if (page === 0) {
      options = [
        { value: "__select_all__", label: "Select All" },
        { value: "__deselect_all__", label: "Deselect All" },
        ...options,
      ];
    }

    setOptions((oldOptions) => [...oldOptions, ...options]);

    return {
      options,
      hasMore: data.totalPages > page,
      additional: {
        page: page + 1,
      },
    };
  }

  const handleSelectChange = (selected) => {
    if (selected && selected.some((option) => option.value === "__select_all__")) {
      setAllSelected([true, options.length - 2]);

      setValue(
        options.filter(
          (option) => option.value !== "__select_all__" && option.value !== "__deselect_all__"
        )
      );
    } else if (selected && selected.some((option) => option.value === "__deselect_all__")) {
      setValue([]);
    } else {
      setValue(selected);
    }
  };

  return (
    <AsyncPaginate
      value={value}
      loadOptions={loadOptions}
      isClearable
      placeholder="Select a passenger"
      additional={{
        page: 0,
      }}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      isMulti={true}
      components={{ Option }}
      onChange={handleSelectChange}
      styles={{
        option: (baseStyles, state) => {
          return {
            ...baseStyles,
            borderColor: state.isFocused ? "grey" : "red",
            color: "black",

            ...(state.data.value === "__select_all__" || state.data.value === "__deselect_all__"
              ? {
                  "& input": { visibility: "inline" },
                  color: "black",
                  fontWeight: "700",
                  "& input::before": {
                    content: `" "`,
                    position: "absolute",
                    display: "block",
                    width: "11px",
                    height: "11px",
                    border: "1px solid black",
                    borderRadius: "2px",

                    ...(state.data.value === "__select_all__"
                      ? {
                          background: allSelected[0] ? "gray" : "white",
                        }
                      : {
                          background: value === null || value.length === 0 ? "gray" : "white",
                        }),
                  },
                }
              : { "& input": { display: "inline" } }),
          };
        },
      }}
    />
  );
};

EnhancedSelect.propTypes = {
  loadurl:PropTypes.func.isRequired,
}

export default EnhancedSelect;
