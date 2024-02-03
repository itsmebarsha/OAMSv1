/** @format */

"use client";
import { useEffect, useRef, useState, FC, ChangeEvent } from "react";

const MultipleSelect = ({
  value,
  onChange,
  render,
  className = "",
  items = [],
}) => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState(value || []);

  const handleItemClick = (item) => {
    const itemIndex = selectedItems.indexOf(item);
    let updatedItems = [...selectedItems];

    if (itemIndex === -1) {
      updatedItems = [...selectedItems, item];
    } else {
      updatedItems.splice(itemIndex, 1);
    }

    setSelectedItems(updatedItems);
    onChange(updatedItems);
  };

  const filteredItems = items.filter((item) =>
    Object.values(item).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (typeof value === "number") {
        // Convert numbers to strings before searching
        return value.toString().includes(searchTerm.toLowerCase());
      }
      return false;
    })
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    if (showModal) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showModal]);

  const displayValue = selectedItems.join(", ");

  return (
    <>
      <div className=" relative m-1 max-h-[300px] text-xs" ref={dropdownRef}>
        {" "}
        <input
          placeholder="Select subjects"
          value={displayValue} // Display selected item
          readOnly
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onClick={() => setShowModal(!showModal)}
        />
        {showModal && (
          <div className="absolute z-20 mt-2 w-full space-y-0.5 overflow-hidden overflow-y-auto rounded-lg border border-gray-200 bg-white px-1 pb-1 dark:border-gray-700 dark:bg-slate-900">
            <div className="relative flex max-h-[300px] flex-col overflow-hidden bg-white">
              <div className="h-[50px] w-full bg-white p-2">
                <div className="flex">
                  <input
                    className="w-full rounded-lg border-gray-200 px-3 py-2 text-xs before:absolute before:inset-0 before:z-[1] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="h-[250px] overflow-auto p-2">
                <ul>
                  {filteredItems.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleItemClick(item)}
                      className={`mb-1 w-full cursor-pointer rounded-lg px-4 py-2 text-xs text-gray-800 ${
                        selectedItems.includes(item)
                          ? "bg-gray-100 focus:bg-gray-100 dark:bg-slate-800 dark:focus:bg-slate-800"
                          : "hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-slate-800 dark:focus:bg-slate-800"
                      }`}>
                      {render(item)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MultipleSelect;
