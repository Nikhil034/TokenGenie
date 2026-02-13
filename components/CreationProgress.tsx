'use client';

import { TokenCreationStep } from '@/types/token';

interface CreationProgressProps {
  steps: TokenCreationStep[];
  currentStep: number;
}

export default function CreationProgress({ steps, currentStep }: CreationProgressProps) {
  const getStepIcon = (step: TokenCreationStep) => {
    if (step.status === 'completed') {
      return '✓';
    }
    if (step.status === 'in_progress') {
      return '⟳';
    }
    if (step.status === 'error') {
      return '✗';
    }
    return step.step;
  };

  const getStepColor = (step: TokenCreationStep) => {
    if (step.status === 'completed') {
      return 'bg-green-500 text-white';
    }
    if (step.status === 'in_progress') {
      return 'bg-blue-500 text-white animate-pulse';
    }
    if (step.status === 'error') {
      return 'bg-red-500 text-white';
    }
    return 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.step} className="flex-1 flex flex-col items-center relative z-10">
            {index < steps.length - 1 && (
              <div
                className={`absolute top-6 left-[60%] right-0 h-1 ${
                  step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
                style={{ width: 'calc(100% - 48px)' }}
              />
            )}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all relative z-10 ${getStepColor(
                step
              )}`}
            >
              {getStepIcon(step)}
            </div>
            <div className="mt-2 text-center">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {step.name}
              </div>
              {step.message && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-[120px]">
                  {step.message}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
