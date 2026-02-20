import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface IframeModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title?: string;
}

const IframeModal: React.FC<IframeModalProps> = ({ isOpen, onClose, src, title = 'Modal' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="w-full h-full md:w-[95vw] md:h-[95vh] md:rounded-lg md:shadow-2xl flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-300 rounded-lg transition-colors hover:bg-opacity-30"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-gray-600 hover:text-gray-900" />
          </button>
        </div>

        {/* Iframe Container */}
        <div className="flex-1 overflow-hidden bg-white">
          <iframe
            src={src}
            title={title}
            className="w-full h-full border-0"
            allow="geolocation; microphone; camera; payment"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation allow-modals"
          />
        </div>
      </div>
    </div>
  );
};

export default IframeModal;
