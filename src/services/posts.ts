import authService from "../appwrite/auth";
import databaseService from "../appwrite/databases";
import config from "../config/config";
import { Query } from "appwrite";

interface PostInterface {
  $id?: string;
  title: string;
  slug: string;
  article: string;
  featured_image: string;
  status: string;
  user?: string;
}

export class Posts {
  async create({
    title,
    slug,
    article,
    featured_image,
    status,
  }: PostInterface) {
    try {
      const user = await authService.getUser();
      if (!user) throw new Error("User not found");
      const date = new Date();
      return await databaseService.createDocument(
        {
          title,
          slug,
          article,
          featured_image,
          status,
          user: user.$id,
          created_at: date.toISOString(),
          updated_at: date.toISOString(),
        },
        config.APPWRITE_COLLECTION_ID,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create post: ${error.message}`);
      } else {
        throw new Error("Failed to create post");
      }
      return false;
    }
  }

  async update(
    documentId: string,
    {
      title,
      slug,
      article,
      featured_image,
      status,
    }: {
      title: string;
      slug: string;
      article: string;
      featured_image: string;
      status: string;
    },
  ) {
    try {
      const user = await authService.getUser();
      if (!user) throw new Error("User not found");
      const date = new Date();
      return await databaseService.updateDocument(documentId, {
        title,
        slug,
        article,
        featured_image,
        status,
        updatedAt: date.toISOString(),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update post: ${error.message}`);
      } else {
        throw new Error("Failed to update post");
      }
      return false;
    }
  }
  async delete(documentId: string) {
    try {
      const user = await authService.getUser();
      if (!user) throw new Error("User not found");
      const document = await databaseService.getDocument(
        documentId,
        config.APPWRITE_COLLECTION_ID,
      );
      if (!document) throw new Error("Document not found");
      if (document.user !== user.$id) throw new Error("Unauthorized");
      await databaseService.updateDocument(documentId, {
        is_delete: true,
      });
      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete post: ${error.message}`);
      } else {
        throw new Error("Failed to delete post");
      }
    }
  }

  async get(slug: string): Promise<PostInterface> {
    try {
      const documentList = await databaseService.listDocuments(
        config.APPWRITE_COLLECTION_ID,
        [Query.equal("slug", [slug])],
      );
      if (documentList.documents.length === 0)
        throw new Error("Post not found");
      const document = documentList.documents[0];
      const post: PostInterface = {
        $id: document.$id,
        title: document.title,
        slug: document.slug,
        article: document.article,
        featured_image: document.featured_image,
        status: document.status,
        user: document.user,
      };
      return post;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get post: ${error.message}`);
      } else {
        throw new Error("Failed to get post");
      }
    }
  }

  async list() {
    try {
      return await databaseService.listDocuments(
        config.APPWRITE_COLLECTION_ID,
        [
          Query.equal("is_deleted", [false]),
          Query.equal("status", ["publish"]),
        ],
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to list posts: ${error.message}`);
      } else {
        throw new Error("Failed to list posts");
      }
    }
  }
}

const postsService = new Posts();
export default postsService;
