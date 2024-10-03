import { Logo, Logout, Container, LoginSignup } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export const Header = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated || false,
  );
  const navLinks = [
    {
      name: "Features",
      url: "/featuers",
    },
    {
      name: "Marketplace",
      url: "/marketplace",
    },
    {
      name: "Company",
      url: "/company",
    },
  ];

  return (
    <>
      <header className="bg-white">
        <Container>
          <nav
            className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <Logo width="50px" />
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.url}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {isAuthenticated ? <Logout /> : <LoginSignup />}
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
};
