import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

const createEmotionCache = () => {
  let insertionPoint: HTMLElement | undefined;

  if (isBrowser) {
    const emotionInsertionPoint: HTMLElement | null = document.querySelector('meta[name="emotion-insertion-point"]');
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'mui-style', insertionPoint });
};

export default createEmotionCache;