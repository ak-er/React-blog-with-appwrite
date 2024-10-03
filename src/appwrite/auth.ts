import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.APPWRITE_ENDPOINT)
      .setProject(config.APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  async register({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        username,
      );
      if (!user) throw new Error("User not created");
      return this.login({ email, password });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to register user: ${error.message}`);
      } else {
        throw new Error("Failed to register user");
      }
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to login: ${error.message}`);
      } else {
        throw new Error("Failed to login");
      }
    }
  }

  async getUser() {
    try {
      return await this.account.get();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get user: ${error.message}`);
      } else {
        throw new Error("Failed to get user");
      }
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to logout: ${error.message}`);
      } else {
        throw new Error("Failed to logout");
      }
    }
  }
}

const authService = new AuthService();
export default authService;
