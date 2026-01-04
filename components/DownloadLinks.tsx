'use client';

import { useState } from 'react';
import { Download, ExternalLink, Check, Copy, AlertCircle } from 'lucide-react';

interface DownloadLinksProps {
  downloadData: any;
}

export default function DownloadLinks({ downloadData }: DownloadLinksProps) {
  const [activeTab, setActiveTab] = useState('480p');
  const [copiedLinks, setCopiedLinks] = useState<Set<string>>(new Set());

  const availableQualities = Object.keys(downloadData || {}).filter(key => 
    downloadData[key]?.length > 0
  ).sort((a, b) => {
    const order = ['1080p', '720p', '480p', '360p'];
    const aNum = parseInt(a.match(/\d+/)?.[0] || '0');
    const bNum = parseInt(b.match(/\d+/)?.[0] || '0');
    return bNum - aNum;
  });

  const currentDownloads = downloadData?.[activeTab] || [];

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLinks(prev => new Set(prev).add(url));
    
    setTimeout(() => {
      setCopiedLinks(prev => {
        const newSet = new Set(prev);
        newSet.delete(url);
        return newSet;
      });
    }, 2000);
  };

  const getQualityName = (key: string) => {
    const match = key.match(/d(\d+)p/);
    return match ? `${match[1]}p` : key;
  };

  if (!downloadData || availableQualities.length === 0) {
    return (
      <div className="p-4 bg-gray-900 rounded-xl">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400" />
          <p className="text-gray-300">Download link tidak tersedia untuk episode ini</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      {/* Quality Tabs */}
      <div className="flex border-b border-gray-800">
        {availableQualities.map((quality) => (
          <button
            key={quality}
            onClick={() => setActiveTab(quality)}
            className={`flex-1 py-3 text-center text-sm font-medium ${
              activeTab === quality
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {getQualityName(quality).toUpperCase()}
          </button>
        ))}
      </div>

      {/* Download Links */}
      <div className="p-4">
        <div className="space-y-2">
          {currentDownloads.map((link: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-900 rounded">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium">{link.nama}</p>
                  <p className="text-xs text-gray-400">{getQualityName(activeTab)} • MP4</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink(link.href)}
                  className={`p-2 rounded ${
                    copiedLinks.has(link.href)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  title="Salin link"
                >
                  {copiedLinks.has(link.href) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 rounded hover:bg-blue-700"
                  title="Download"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Download Info */}
        <div className="mt-4 p-3 bg-gray-800 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-400">
              Link download mengarah ke halaman safelink. Tunggu beberapa detik 
              dan klik tombol "Get Link" untuk mendapatkan link download sebenarnya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}