import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import postsService from "../services/posts";
import { Button, Spinner } from "../components/index";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import parse from "html-react-parser";

interface PostInterface {
  $id?: string;
  slug: string;
  title: string;
  article: string;
  status: string;
  featured_image: string;
  image?: FileList;
  user?: string;
}

export const PostPage = () => {
  const user = useSelector((state: RootState) => state.auth);
  const [post, setPost] = useState<PostInterface>();
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug === undefined) {
      navigate("/");
    }
    if (slug) {
      postsService.get(slug).then((data) => {
        setPost(data);
      });
    }
    setLoading(false);
  }, [slug, navigate]);

  return (
    <>
      <div className="w-full mx-auto">
        <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8">
          {!loading ? (
            post && (
              <>
                <img
                  className="mx-auto"
                  src={post?.featured_image}
                  alt={post.title}
                />
                <h1 className="font-semibold text-xl tracking-wide">
                  {post.title}
                </h1>
                <p>{parse(post.article)}</p>
                {user.isAuthenticated &&
                  user.user &&
                  user.user?.$id == post.user && (
                    <>
                      <Button className="bg-blue-400"> Edit </Button>
                      <Button className="bg-red-400"> Delete </Button>
                    </>
                  )}
              </>
            )
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  );
};
