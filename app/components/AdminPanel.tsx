'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFlags } from 'launchdarkly-react-client-sdk';
import {  X, Settings } from 'lucide-react';
import { handleToggleFlag } from './handleToggleFlag';
import { useMutation } from '@tanstack/react-query';
import { ToggleFlag } from './ToggleFlag';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const flags = useFlags();

  const mutation = useMutation({
    mutationFn: handleToggleFlag,
  });

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Feature Flag Admin</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Flags 
                </h3>
                
                <div className="grid gap-3">
                  {Object.entries(flags).map(([flagKey, flagValue]) => (
                    <div key={flagKey} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <span className="font-medium text-gray-900 capitalize">
                          {flagKey.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {typeof flagValue === 'boolean' ? (
                          <ToggleFlag flagKey={flagKey} flagValue={flagValue} />
                        ) : (
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {String(flagValue)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};