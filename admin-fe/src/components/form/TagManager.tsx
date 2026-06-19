import { useState } from "react";

import Label from "./Label";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import Input from "./input/InputField";

type Props = {
  label: string;
  items: string[];

  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;

  setItems: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function TagManager({
  label,
  items,
  selected,
  setSelected,
  setItems,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [newValue, setNewValue] = useState("");

  const addItem = () => {
    if (!newValue.trim()) return;

    setItems((prev) => [...prev, newValue]);

    setSelected(newValue);

    setNewValue("");

    setIsOpen(false);
  };

  const removeItem = (itemToRemove: string) => {
    setItems(items.filter((item) => item !== itemToRemove));
  };

  return (
    <>
      <div>
        <Label>{label}</Label>

        {/* chọn cho Product */}

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 mb-4 dark:border-gray-700 dark:bg-gray-800"
        >
          <option value="">Select {label}</option>

          {items.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* quản lý danh mục */}

        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <div
              key={item}
              onClick={() => setSelected(item)}
              className={`
    flex
    cursor-pointer
    items-center
    gap-2
    rounded-full
    px-4
    py-2
    transition-all

    ${
      selected === item
        ? "bg-brand-500 text-white"
        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800"
    }
  `}
            >
              <span>{item}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  removeItem(item);
                }}
                className="
      text-red-500
      hover:text-red-700
    "
              >
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={() => setIsOpen(true)}
            className="rounded-full border border-dashed px-4 py-2 text-blue-500"
          >
            + Add
          </button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-[400px]"
      >
        <div className="p-6">
          <h4 className="mb-4 text-xl font-semibold">Add {label}</h4>

          <Input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>

            <Button onClick={addItem}>Save</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
