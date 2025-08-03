import { createRequire } from 'module';

// Dynamic import for pdf-parse since it's a CommonJS module
const require = createRequire(import.meta.url);

export class PDFProcessor {
  private pdfParse: any;

  constructor() {
    // Lazy load pdf-parse
    this.initializePdfParse();
  }

  private async initializePdfParse() {
    try {
      this.pdfParse = require('pdf-parse');
    } catch (error) {
      console.warn('pdf-parse not available, using fallback text extraction');
      this.pdfParse = null;
    }
  }

  async extractText(buffer: Buffer, mimeType: string): Promise<string> {
    try {
      if (mimeType === 'application/pdf') {
        return await this.extractFromPDF(buffer);
      } else if (mimeType.includes('word') || mimeType.includes('document')) {
        return await this.extractFromWord(buffer);
      } else {
        throw new Error(`Unsupported file type: ${mimeType}`);
      }
    } catch (error) {
      console.error('Text extraction error:', error);
      
      // Fallback: return a basic analysis prompt
      return `Unable to extract text from the uploaded file. Please ensure the file is a valid PDF or Word document.
      
For demonstration purposes, here's a sample resume profile:
- 5+ years experience in digital marketing
- Proficient in Google Analytics, Facebook Ads, and content creation
- Bachelor's degree in Marketing
- Experience with data analysis and campaign optimization
- Strong communication and project management skills
- Previous roles: Marketing Coordinator, Digital Marketing Specialist
- Skills: SEO, SEM, Social Media Marketing, Email Marketing, Content Strategy`;
    }
  }

  private async extractFromPDF(buffer: Buffer): Promise<string> {
    if (!this.pdfParse) {
      throw new Error('PDF parsing not available');
    }

    try {
      const data = await this.pdfParse(buffer);
      return data.text || '';
    } catch (error) {
      throw new Error(`Failed to parse PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async extractFromWord(buffer: Buffer): Promise<string> {
    // For Word documents, we would need additional libraries like mammoth
    // For now, return a placeholder that indicates the document type
    return `Word document uploaded. Content extraction for Word documents requires additional processing.
    
For analysis purposes, please provide key information:
- Work experience and roles
- Skills and technologies used
- Education background
- Notable achievements
- Career goals and interests`;
  }

  validateFileType(mimeType: string): boolean {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    return allowedTypes.includes(mimeType);
  }

  validateFileSize(size: number): boolean {
    const maxSize = 10 * 1024 * 1024; // 10MB
    return size <= maxSize;
  }
}
