import { getContext, hasContext, setContext } from 'svelte';

const TIMELINE_CONTEXT_KEY = 'timeline:context';

type TimelineContextValue = {
  activeStep: number;
  setActiveStep: (step: number) => void;
};

export const setTimelineContext = (value: TimelineContextValue) =>
  setContext<TimelineContextValue>(TIMELINE_CONTEXT_KEY, value);

export const useTimeline = (): TimelineContextValue => {
  if (!hasContext(TIMELINE_CONTEXT_KEY)) {
    throw new Error('useTimeline must be used within a Timeline');
  }

  return getContext<TimelineContextValue>(TIMELINE_CONTEXT_KEY);
};
