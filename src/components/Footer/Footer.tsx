import { Logo } from "../index";

export const Footer = () => {
  return (
    <>
      <footer className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Logo width="50px" />
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#" className="text-sm font-normal leading-6 text-gray-900">
              &copy; 2024 Blog with React.js & Tailwind CSS
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
};
