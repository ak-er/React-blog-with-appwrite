import { Link } from "react-router-dom";

export const Logo = ({ width = "100px", to = "/" }) => {
  return (
    <Link to={to} className="-m-1.5 p-1.5">
      <div className="logo">
        <img
          width={width}
          src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_1280.png"
          alt="logo"
          className="mx-auto"
        />
      </div>
    </Link>
  );
};
