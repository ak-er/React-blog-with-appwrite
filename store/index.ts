import authReducer from "../src/features/auth/authSlice";
import postReducer, { PostState } from "../src/features/posts/postSlice";
import alertReducer, {
  AlertState,
} from "../src/features/configSlice/configSlice";

export { authReducer, postReducer, alertReducer };
export type { PostState, AlertState };
