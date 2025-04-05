import LogoSite from "../LogoSite";

const Navbar: React.FC = () => {
  return (
    <nav className="p-4 flex items-center justify-between">
      <div className="flex-grow flex justify-center">
        <LogoSite />
      </div>
    </nav>
  );
};

export default Navbar;
