import { FcFilmReel } from "react-icons/fc";
import { SiLinkedin, SiGithub } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-transparent p-10 text-primary-content">
      <div>
        <span className="flex items-center gap-x-2">
          <FcFilmReel className="h-12 w-12" />
          <p className="text-2xl font-bold">Cinematik</p>
        </span>
      </div>
      <a target="_blank" href="https://arandeep.com" rel="noreferrer" className="text-2xl">
        arandeep.com
      </a>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a target="_blank" href="https://www.linkedin.com/in/arandeep/" rel="noreferrer">
            <SiLinkedin className="h-8 w-8" />
          </a>
          <a target="_blank" href="https://github.com/ashayer" rel="noreferrer">
            <SiGithub className="h-8 w-8" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
