import { useState, useEffect } from "react";
import { PostForm, Container } from "../components/index";
import postsService from "../services/posts";
import { useParams, useNavigate } from "react-router-dom";

interface PostInterface {
  $id: string;
  slug: string;
  title: string;
  article: string;
  status: string;
  featuredImage: string;
  image?: FileList;
}

export const EditPostPage = () => {
  const [post, setPost] = useState<PostInterface>();
  const { slug } = useParams<string>();
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
  }, [slug, navigate]);

  return (
    <>
      {post ? (
        <Container>
          <PostForm post={post} />
        </Container>
      ) : (
        <Container>No Post Found.</Container>
      )}
    </>
  );
};
