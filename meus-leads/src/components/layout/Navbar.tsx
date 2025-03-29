import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import ProfileModal from "../modal/ProfileModal";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-between items-center">
        <li className="relative ml-auto">
          <button
            onClick={toggleModal}
            className="text-white p-2 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            <FaUserCircle size={40} />
          </button>

          <ProfileModal isOpen={isModalOpen} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
