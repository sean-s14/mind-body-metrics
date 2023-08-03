import { DIMENSIONS } from "@/constants/styles";
import { AiOutlineGithub } from "react-icons/ai";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="flex justify-center items-center px-4 bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-200"
      style={{ height: DIMENSIONS.FOOTER_HEIGHT }}
    >
      <ul className="flex flex-col gap-2">
        <li className="flex items-center gap-1">
          <span>Created by</span>
          <span className="font-semibold">Sean Stocker</span>
          <a
            href="https://github.com/sean-s14/mind-body-metrics"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineGithub size={30} />
          </a>
        </li>
        <li>© {currentYear} Mind Body Metrics. All rights reserved.</li>
      </ul>
    </footer>
  );
}
