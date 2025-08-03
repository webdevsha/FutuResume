import { 
  type User, 
  type InsertUser,
  type Resume,
  type InsertResume,
  type CareerAnalysis,
  type InsertCareerAnalysis
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Resume methods
  getResume(id: string): Promise<Resume | undefined>;
  createResume(resume: InsertResume): Promise<Resume>;
  getResumesByUserId(userId: string): Promise<Resume[]>;
  
  // Career analysis methods
  getCareerAnalysis(id: string): Promise<CareerAnalysis | undefined>;
  createCareerAnalysis(analysis: InsertCareerAnalysis): Promise<CareerAnalysis>;
  getAnalysesByResumeId(resumeId: string): Promise<CareerAnalysis[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private resumes: Map<string, Resume>;
  private careerAnalyses: Map<string, CareerAnalysis>;

  constructor() {
    this.users = new Map();
    this.resumes = new Map();
    this.careerAnalyses = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Resume methods
  async getResume(id: string): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const id = randomUUID();
    const resume: Resume = {
      id,
      userId: insertResume.userId || null,
      filename: insertResume.filename,
      content: insertResume.content,
      extractedText: insertResume.extractedText || null,
      uploadedAt: new Date()
    };
    this.resumes.set(id, resume);
    return resume;
  }

  async getResumesByUserId(userId: string): Promise<Resume[]> {
    return Array.from(this.resumes.values()).filter(
      (resume) => resume.userId === userId
    );
  }

  // Career analysis methods
  async getCareerAnalysis(id: string): Promise<CareerAnalysis | undefined> {
    return this.careerAnalyses.get(id);
  }

  async createCareerAnalysis(insertAnalysis: InsertCareerAnalysis): Promise<CareerAnalysis> {
    const id = randomUUID();
    const analysis: CareerAnalysis = {
      id,
      resumeId: insertAnalysis.resumeId,
      goal: insertAnalysis.goal,
      currentSkills: Array.isArray(insertAnalysis.currentSkills) ? insertAnalysis.currentSkills : null,
      pathways: Array.isArray(insertAnalysis.pathways) ? insertAnalysis.pathways : null,
      marketData: insertAnalysis.marketData || null,
      createdAt: new Date()
    };
    this.careerAnalyses.set(id, analysis);
    return analysis;
  }

  async getAnalysesByResumeId(resumeId: string): Promise<CareerAnalysis[]> {
    return Array.from(this.careerAnalyses.values()).filter(
      (analysis) => analysis.resumeId === resumeId
    );
  }
}

export const storage = new MemStorage();
