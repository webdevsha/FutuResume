import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { CareerAnalyzer } from "./services/career-analyzer";
import { PDFProcessor } from "./services/pdf-processor";
import { CareerGoal } from "@shared/schema";
import { z } from "zod";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
    }
  }
});

const careerAnalyzer = new CareerAnalyzer();
const pdfProcessor = new PDFProcessor();

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload resume endpoint
  app.post('/api/upload-resume', upload.single('resume'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Extract text from the uploaded file
      const extractedText = await pdfProcessor.extractText(req.file.buffer, req.file.mimetype);
      
      // Save the resume
      const resume = await storage.createResume({
        userId: null, // Anonymous for now
        filename: req.file.originalname,
        content: req.file.buffer.toString('base64'),
        extractedText
      });

      res.json({
        id: resume.id,
        filename: resume.filename,
        message: 'Resume uploaded and processed successfully'
      });
    } catch (error) {
      console.error('Resume upload error:', error);
      res.status(500).json({ 
        message: 'Failed to upload resume',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Career analysis endpoint
  app.post('/api/analyze-career', async (req, res) => {
    try {
      const { resumeId, goal } = req.body;
      
      // Validate input
      const goalValidation = CareerGoal.safeParse(goal);
      if (!goalValidation.success) {
        return res.status(400).json({ message: 'Invalid goal specified' });
      }

      // Get the resume
      const resume = await storage.getResume(resumeId);
      if (!resume) {
        return res.status(404).json({ message: 'Resume not found' });
      }

      if (!resume.extractedText) {
        return res.status(400).json({ message: 'Resume text extraction failed' });
      }

      // Perform career analysis
      const analysis = await careerAnalyzer.analyzeCareer(
        resume.extractedText,
        goalValidation.data
      );

      // Save the analysis
      const savedAnalysis = await storage.createCareerAnalysis({
        resumeId,
        goal: goalValidation.data,
        currentSkills: analysis.currentSkills,
        pathways: analysis.pathways,
        marketData: analysis.marketData
      });

      res.json(savedAnalysis);
    } catch (error) {
      console.error('Career analysis error:', error);
      res.status(500).json({ 
        message: 'Failed to analyze career paths',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get career analysis endpoint
  app.get('/api/career-analysis/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const analysis = await storage.getCareerAnalysis(id);
      
      if (!analysis) {
        return res.status(404).json({ message: 'Analysis not found' });
      }

      res.json(analysis);
    } catch (error) {
      console.error('Get analysis error:', error);
      res.status(500).json({ 
        message: 'Failed to retrieve analysis',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Market insights endpoint
  app.get('/api/market-insights', async (req, res) => {
    try {
      const insights = await careerAnalyzer.getMarketInsights();
      res.json(insights);
    } catch (error) {
      console.error('Market insights error:', error);
      res.status(500).json({ 
        message: 'Failed to get market insights',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
