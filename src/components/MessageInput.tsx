
import React, { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FileUpload from './FileUpload';
import { FilePreview } from '@/hooks/useChat';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  selectedFiles: FilePreview[];
  handleFileChange: (files: FileList | null) => void;
  removeFile: (fileId: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isLoading,
  selectedFiles,
  handleFileChange,
  removeFile
}) => {
  const [message, setMessage] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || selectedFiles.length > 0) {
      onSendMessage(message);
      setMessage('');
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t bg-background sticky bottom-0 p-4 shadow-lg"
    >
      <FileUpload 
        selectedFiles={selectedFiles}
        handleFileChange={handleFileChange}
        removeFile={removeFile}
      />
      
      <div className="flex items-end space-x-2 mt-2">
        <div className="flex-1 relative">
          <textarea
            ref={textAreaRef}
            value={message}
            onChange={handleTextAreaChange}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua pergunta ou meta de carreira..."
            className="w-full resize-none p-3 pr-10 rounded-xl border border-input focus:border-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none min-h-[44px] max-h-32"
            rows={1}
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading && !selectedFiles.length && !message.trim()}
          className="rounded-full aspect-square"
        >
          <Send size={18} />
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
