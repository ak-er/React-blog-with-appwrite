import { useCallback, useEffect } from "react";
import { Input, Button, RichTextEditor, Select } from "../index";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import storageService from "../../appwrite/storage";
import postsService from "../../services/posts";

interface Post {
  $id: string;
  slug: string;
  title: string;
  article: string;
  status: string;
  featured_image: string;
  image?: FileList;
}

export const PostForm = ({ post }: { post?: Post }) => {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm<Post>({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        article: post?.article || "",
        status: post?.status || "draft",
        featured_image: post?.featured_image || "",
      },
    });

  const navigate = useNavigate();

  const submit: SubmitHandler<Post> = async (data) => {
    if (!data.image && !post) {
      throw new Error("Image is required");
    }

    if (data.image) {
      const image = data.image[0];
      const imageUrl = await storageService.upload(image);

      const postData = {
        title: data.title,
        slug: data.slug,
        featured_image: imageUrl,
        status: data.status,
        article: data.article,
      };

      if (post) {
        // Update existing post
        await postsService.update(post.$id, { ...postData });
        navigate(`/${post.slug}`);
      } else {
        // Create new post
        await postsService.create(postData);
        navigate(`/${data.slug}`);
      }
    }
  };

  const parseSlug = useCallback((value: string) => {
    if (value)
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z0-9\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title" && typeof value.title === "string") {
        setValue("slug", parseSlug(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, parseSlug, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        {...register("title", { required: true })}
        type="text"
        label="Post title"
        labelClass="block text-sm font-medium leading-6 text-gray-900"
        className="block px-2 mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Write a title"
        autoComplete="post-title"
      />
      <Input
        {...register("slug", { required: true })}
        type="text"
        label="Post slug"
        labelClass="block text-sm font-medium leading-6 text-gray-900"
        className="block px-2 mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Write a slug"
        autoComplete="post-slug"
      />
      <RichTextEditor
        label="Post content"
        name="article"
        control={control}
        defaultValue={getValues("article")}
      />
      <Input
        label="Featured Image"
        type="file"
        labelClass="block text-sm font-medium leading-6 text-gray-900"
        className="block px-2 mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        accept="image/png, image/jpeg, image/jpg, image/gif"
        {...register("image", { required: !post })}
      />
      {post && (
        <img
          src={storageService.preview(post.featured_image)}
          alt={post.title}
        />
      )}
      <Select
        label="Status"
        options={[
          { value: "draft", title: "Draft" },
          { value: "publish", title: "Publish" },
        ]}
        {...register("status", { required: true })}
      />
      <Button type="submit">{post ? "Update Post" : "Create Post"}</Button>
    </form>
  );
};
