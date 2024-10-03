import { Button } from "../index";
import { Link } from "react-router-dom";

export const LoginSignup = () => {
  return (
    <>
      <Link to={"signup"}>
        <Button type="submit" className="text-gray-900 hover:bg-blue-600/20">
          Sign up
        </Button>
      </Link>
      <Link to={"login"}>
        <Button className="text-gray-900 bg-indigo-600/10  hover:bg-indigo-600/20">
          Log in <span aria-hidden="true">&rarr;</span>
        </Button>
      </Link>
    </>
  );
};
