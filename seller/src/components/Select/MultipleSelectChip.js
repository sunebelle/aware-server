import React, { useState } from "react";

const MultipleSelectChip = ({ listOptions, setSelected, selected }) => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  // const [selected, setSelected] = useState([]);
  const [currentSelected, setCurrentSelected] = useState("");

  const handleSelect = (option) => {
    setCurrentSelected(option);
    if (selected.includes(option)) {
      return;
    }
    setSelected([...selected, option]);
    // setShowDropdownMenu(false);
  };
  const handleDelete = (select) => {
    setSelected(selected.filter((item) => item !== select));
  };
  return (
    <div className="relative">
      <div
        // onClick={() => setShowDropdownMenu((state) => !state)}
        className=" bg-border-select cursor-pointer justify-between pl-2 pr-3 "
      >
        <div className="inline-flex w-full overflow-x-auto scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-gray-100 ">
          {selected?.map((select, i) => (
            <div
              key={i}
              className="flex items-center h-8 bg-[#f6f6f6] rounded px-2 space-x-2 justify-between mr-2"
            >
              <h2>{select} </h2>
              <img
                onClick={() => handleDelete(select)}
                className="w-4 h-4"
                src="/img/close-2.svg"
                alt="close"
              />
            </div>
          ))}
        </div>
        <img
          onClick={() => setShowDropdownMenu((state) => !state)}
          className={`${showDropdownMenu && "transform rotate-180"}`}
          src="/img/dropdown.svg"
          alt="dropdown"
        />
      </div>
      {showDropdownMenu && (
        <div className="absolute z-50 px-4 top-12 flex-col shadow-lg bg-border-select h-28 overflow-y-auto scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-gray-100">
          {listOptions?.map((option, i) => {
            const active = option === currentSelected;
            return (
              <div
                key={i}
                className="w-full"
                onClick={() => handleSelect(option)}
                onMouseLeave={() => setShowDropdownMenu(false)}
                onMouseEnter={() => setShowDropdownMenu(true)}
              >
                <h2
                  className={`${
                    active && "bg-[#ffa15f]"
                  } cursor-pointer text-right`}
                >
                  {option}
                </h2>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultipleSelectChip;
