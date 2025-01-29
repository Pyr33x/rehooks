import { useCallback, useEffect, useMemo, useState } from "react";

const description =
  "Manages step-based navigation with imperative controls. Returns step navigation methods and state.";

type UseStepProps<T = number> = {
  totalSteps?: number;
  steps?: T[];
  initialStep?: T;
};

type UseStepReturn<T> = {
  currentStep: T;
  nextStep: () => void;
  prevStep: () => void;
  jumpTo: (step: T) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
};

/**
 * Manages step-based navigation with imperative controls. Returns step navigation methods and state.
 *
 * @template T - Type for step identifiers (default: number)
 * @param {Object} config - Configuration object for step management
 * @param {number} [config.totalSteps] - Total number of steps (required if steps not provided)
 * @param {T[]} [config.steps] - Array of custom step identifiers (required if totalSteps not provided)
 * @param {T} [config.initialStep] - Initial step identifier (defaults to first step)
 *
 * @returns {UseStepReturn<T>} An object containing:
 * - `currentStep`: Currently active step identifier
 * - `nextStep`: Advances to the next step if available
 * - `prevStep`: Returns to the previous step if available
 * - `jumpTo`: Jumps directly to a specific step identifier
 * - `isFirstStep`: True if current step is the first step
 * - `isLastStep`: True if current step is the final step
 */

export function useStep<T = number>(config: UseStepProps<T>): UseStepReturn<T> {
  const {
    totalSteps: totalStepsConfig,
    steps: stepsConfig,
    initialStep,
  } = config;

  if (!stepsConfig && !totalStepsConfig) {
    throw new Error("You must provide either steps or totalSteps");
  }

  const steps = useMemo(
    () =>
      stepsConfig ??
      Array.from(
        { length: totalStepsConfig ?? 0 },
        (_, i) => (i + 1) as unknown as T,
      ),
    [stepsConfig, totalStepsConfig],
  );

  const totalSteps = steps.length;
  const initialIndex = steps.indexOf(initialStep as T);
  const safeInitialIndex = initialIndex !== -1 ? initialIndex : 0;

  const [currentIndex, setCurrentIndex] = useState<number>(safeInitialIndex);

  useEffect(() => {
    setCurrentIndex((prev) => Math.max(0, Math.min(prev, totalSteps - 1)));
  }, [totalSteps]);

  const nextStep = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const jumpTo = useCallback(
    (step: T) => {
      const newIndex = steps.indexOf(step);
      if (newIndex !== -1) {
        setCurrentIndex(newIndex);
      }
    },
    [steps],
  );

  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === totalSteps - 1;

  return {
    currentStep: steps[currentIndex],
    nextStep,
    prevStep,
    jumpTo,
    isFirstStep,
    isLastStep,
  };
}
