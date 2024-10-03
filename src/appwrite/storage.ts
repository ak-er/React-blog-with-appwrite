import config from "../config/config";
import { Client, Storage, ID } from "appwrite";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(config.APPWRITE_ENDPOINT)
      .setProject(config.APPWRITE_PROJECT_ID);
    this.storage = new Storage(this.client);
  }

  async upload(file: File) {
    try {
      const image = await this.storage.createFile(
        config.APPWRITE_BUCKET_ID,
        ID.unique(),
        file,
      );
      const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${config.APPWRITE_BUCKET_ID}/files/${image.$id.toString()}/view?project=${config.APPWRITE_PROJECT_ID}&project=${config.APPWRITE_PROJECT_ID}`;
      return imageUrl.toString();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to upload file: ${error.message}`);
      } else {
        throw new Error("Failed to upload file");
      }
    }
  }

  preview(fileId: string) {
    try {
      const imageUrl = this.storage.getFilePreview(
        config.APPWRITE_BUCKET_ID,
        fileId,
      );
      return imageUrl.toString();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to preview file: ${error.message}`);
      } else {
        throw new Error("Failed to preview file");
      }
      return "";
    }
  }
}

const storageService = new StorageService();
export default storageService;
