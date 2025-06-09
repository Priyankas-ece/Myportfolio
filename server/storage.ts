import { users, contactSubmissions, pageViews, type User, type InsertUser, type ContactSubmission, type InsertContactSubmission, type PageView, type InsertPageView } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  createPageView(pageView: InsertPageView): Promise<PageView>;
  getPageViewStats(): Promise<{ page: string; count: number }[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [contactSubmission] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return contactSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
  }

  async createPageView(pageView: InsertPageView): Promise<PageView> {
    const [view] = await db
      .insert(pageViews)
      .values(pageView)
      .returning();
    return view;
  }

  async getPageViewStats(): Promise<{ page: string; count: number }[]> {
    const result = await db
      .select({
        page: pageViews.page,
        count: sql<number>`count(*)`.as('count'),
      })
      .from(pageViews)
      .groupBy(pageViews.page);
    
    return result;
  }
}

export const storage = new DatabaseStorage();
