
import { FileSearch } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <FileSearch size={28} />
        <span>RESUME AI</span>
      </div>

      <a href="#analyzer" className="nav-link">
        Analyze Resume
      </a>
    </nav>
  );
}

export default Navbar;
