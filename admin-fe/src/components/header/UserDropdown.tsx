import { useState } from "react";
import { useNavigate } from "react-router";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const signOut = () => {
    navigate("/");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3"
      >
        <img
          src="https://i.pravatar.cc/100"
          className="w-10 h-10 rounded-full"
        />

        <span className="font-medium">Admin</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 w-[180px] rounded-xl border border-gray-200 bg-white shadow-lg">
          <button
            onClick={signOut}
            className="w-full px-4 py-3 text-left hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
