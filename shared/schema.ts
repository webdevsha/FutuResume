import { sql } from "drizzle-orm";
import { pgTable, text, varchar, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const resumes = pgTable("resumes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  filename: text("filename").notNull(),
  content: text("content").notNull(),
  extractedText: text("extracted_text"),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const careerAnalyses = pgTable("career_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  resumeId: varchar("resume_id").notNull(),
  goal: text("goal").notNull(), // 'pivot', 'step-up', 'new-phase'
  currentSkills: json("current_skills").$type<string[]>(),
  pathways: json("pathways").$type<CareerPathway[]>(),
  marketData: json("market_data").$type<MarketData>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type CareerPathway = {
  id: string;
  type: 'traditional' | 'niche' | 'custom';
  title: string;
  description: string;
  icon: string;
  salary: {
    min: number;
    max: number;
  };
  timeline: string;
  competition: 'high' | 'medium' | 'low';
  demand: string;
  skills: {
    required: string[];
    recommended: string[];
    toLearn: string[];
  };
  marketScore: number;
  skillMapping?: {
    type: string;
    description: string;
    icon: string;
    approach: string;
  };
  evidenceFromResume?: string[];
  organizations?: string[];
  realJobOpenings?: number;
  competitorCount?: number;
};

export type MarketData = {
  trends: {
    skill: string;
    growth: number;
    demand: 'high' | 'medium' | 'low';
  }[];
  salaryProjections: {
    role: string;
    current: { min: number; max: number };
    projected: { min: number; max: number };
  }[];
  competitionLevels: {
    traditional: number;
    niche: number;
    custom: number;
  };
};

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  uploadedAt: true,
});

export const insertCareerAnalysisSchema = createInsertSchema(careerAnalyses).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;

export type CareerAnalysis = typeof careerAnalyses.$inferSelect;
export type InsertCareerAnalysis = z.infer<typeof insertCareerAnalysisSchema>;

// Goal enum for type safety
export const CareerGoal = z.enum(['pivot', 'step-up', 'new-phase']);
export type CareerGoalType = z.infer<typeof CareerGoal>;
