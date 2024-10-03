import { createSlice } from "@reduxjs/toolkit";

interface PostProps {
  $id: string;
  title: string;
  slug: string;
  article: string;
  featured_image: string;
  status: string;
  is_deleted: boolean;
  user: string;
  created_at: Date;
  updated_at: Date;
}

const initialState: {
  posts: PostProps[];
} = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    list: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { list } = postSlice.actions;
export default postSlice.reducer;
interface RootState {
  posts: PostProps[];
}
export type { RootState as PostState };
