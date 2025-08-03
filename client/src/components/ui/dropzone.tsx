import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropzoneProps {
  onFileUpload: (file: File) => void;
  isUploading?: boolean;
  uploadedFile?: File | null;
  className?: string;
}

export default function Dropzone({ 
  onFileUpload, 
  isUploading = false, 
  uploadedFile = null,
  className 
}: DropzoneProps) {
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileUpload(file);
      
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    disabled: isUploading
  });

  return (
    <div className={cn(className)}>
      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer",
            isDragActive 
              ? "border-dark-purple bg-light-purple/10" 
              : "border-light-purple hover:border-dark-purple hover:bg-gray-50",
            isUploading && "cursor-not-allowed opacity-50"
          )}
        >
          <input {...getInputProps()} />
          <div className="text-dark-purple mb-4">
            <Upload size={48} className="mx-auto" />
          </div>
          <p className="text-lg font-medium text-dark-purple mb-2">
            {isDragActive 
              ? "Drop your resume here" 
              : "Drop your resume or transcript here"
            }
          </p>
          <p className="text-gray-600 mb-4">or click to browse (PDF, DOC, DOCX)</p>
          <Button 
            type="button"
            className="bg-light-purple text-dark-purple hover:bg-light-purple/80"
            disabled={isUploading}
          >
            Choose File
          </Button>
        </div>
      ) : (
        <div className="border-2 border-sage-green rounded-xl p-6 bg-sage-green/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-sage-green/10 rounded-lg">
                <FileText className="text-sage-green" size={24} />
              </div>
              <div>
                <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                <p className="text-sm text-gray-600">
                  {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="text-sage-green" size={20} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.reload()}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
          
          {isUploading && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Uploading...</span>
                <span className="text-sm text-gray-600">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
