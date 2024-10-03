import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { list } from "../../features/index";
import { useDispatch } from "react-redux";
import postService from "../../services/posts";
import { useEffect, useState } from "react";
import { Spinner } from "../index";

export const PostCard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService.list().then((data) => {
      dispatch(list(data.documents));
      setLoading(false);
    });
  }, [dispatch]);

  const products = useSelector((state: RootState) => state.posts.posts);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Latest Posts
        </h2>

        {!loading ? (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products &&
              products.map((product) => (
                <div
                  key={product.$id}
                  className="group relative bg-zinc-100 rounded overflow-hidden"
                >
                  <div className="w-full overflow-hidden group-hover:opacity-75">
                    <img
                      alt={product.title}
                      src={product.featured_image}
                      className="w-full object-cover object-center"
                    />
                  </div>
                  <div className="mt-4 flex justify-between px-2 pb-2">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={product.slug}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </Link>
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};
