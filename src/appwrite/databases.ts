import config from "../config/config";
import { Client, Databases, ID } from "appwrite";

interface Document {
  [key: string]: string | boolean;
}

export class DatabaseService {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(config.APPWRITE_ENDPOINT)
      .setProject(config.APPWRITE_PROJECT_ID);
    this.database = new Databases(this.client);
  }

  async getDocument(DOCUMENT_ID: string, COLLECTION_ID: string = "") {
    return this.database.getDocument(
      config.APPWRITE_DATABASE_ID,
      COLLECTION_ID,
      DOCUMENT_ID,
    );
  }

  async createDocument(document: Document, COLLECTION_ID: string = "") {
    this.database.createDocument(
      config.APPWRITE_DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      document,
    );
  }

  async updateDocument(
    DOCUMENT_ID: string,
    document: Document,
    COLLECTION_ID: string = "",
  ) {
    this.database.updateDocument(
      config.APPWRITE_DATABASE_ID,
      COLLECTION_ID,
      DOCUMENT_ID,
      document,
    );
  }

  async listDocuments(COLLECTION_ID: string = "", query: string[] = []) {
    return this.database.listDocuments(
      config.APPWRITE_DATABASE_ID,
      COLLECTION_ID,
      query,
    );
  }
}

const databaseService = new DatabaseService();

export default databaseService;
