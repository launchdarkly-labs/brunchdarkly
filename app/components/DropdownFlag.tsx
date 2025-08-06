'use client'

import { useMutation } from "@tanstack/react-query";
import { handleToggleStringFlag } from "./handleToggleStringFlag";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useFlags } from "launchdarkly-react-client-sdk";

interface DropdownFlagProps {
  flagKey: string;
  flagValue: string;
  options: { value: string; label: string; emoji?: string }[];
}

export const DropdownFlag = ({ flagKey, flagValue, options }: DropdownFlagProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationKey: ['toggleStringFlag', flagKey],
    mutationFn: handleToggleStringFlag,
    onSuccess: () => {
      setIsOpen(false);
    }
  });

  const currentOption = options.find(option => option.value === flagValue) || options[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={mutation.isPending}
        className={`flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-800 hover:bg-blue-100 transition-colors ${
          mutation.isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {currentOption.emoji && <span>{currentOption.emoji}</span>}
        <span>{currentOption.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[150px] bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => mutation.mutate({ flagKey, newValue: option.value })}
              disabled={mutation.isPending}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                option.value === flagValue ? 'bg-blue-50 text-blue-800 font-medium' : 'text-gray-700'
              } ${mutation.isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {option.emoji && <span>{option.emoji}</span>}
              <span>{option.label}</span>
              {option.value === flagValue && (
                <span className="ml-auto text-blue-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};