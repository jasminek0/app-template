import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';
import koMessages from '../lib/i18n/locales/ko.json';
import enMessages from '../lib/i18n/locales/en.json';
import jaMessages from '../lib/i18n/locales/ja.json';
import zhCNMessages from '../lib/i18n/locales/zh-CN.json';
import zhTWMessages from '../lib/i18n/locales/zh-TW.json';

// next-intl 훅을 테스트 환경에서 안전하게 사용하기 위한 기본 mock
vi.mock('next-intl', () => {
  const messagesByLocale = {
    ko: koMessages,
    en: enMessages,
    'ja': jaMessages,
    'zh-CN': zhCNMessages,
    'zh-TW': zhTWMessages,
  } as const;

  type LocaleKey = keyof typeof messagesByLocale;

  let currentLocale: LocaleKey = 'ko';

  const getMessage = (key: string, values?: Record<string, string | number>) => {
    const messages = messagesByLocale[currentLocale] as Record<string, unknown>;
    const parts = key.split('.');
    let result: any = messages;

    for (const part of parts) {
      if (result && typeof result === 'object' && part in result) {
        result = result[part as keyof typeof result];
      } else {
        return key;
      }
    }

    if (typeof result === 'string') {
      if (!values) return result;
      return result.replace(/\{(\w+)\}/g, (_, name) => {
        const value = values[name];
        return value !== undefined ? String(value) : '';
      });
    }

    return key;
  };

  const setLocaleForTests = (locale: LocaleKey) => {
    currentLocale = locale;
  };

  return {
    useTranslations: () => (key: string, values?: Record<string, string | number>) =>
      getMessage(key, values),
    useLocale: () => currentLocale,
    // 테스트 전용 헬퍼 (앱 코드에서는 사용 금지)
    setLocaleForTests,
  };
});

// 각 테스트 전에 로컬 스토리지 초기화 및 브라우저 API mock
beforeEach(() => {
  localStorage.clear();

  // jsdom 환경에서 matchMedia가 없으므로 기본 mock 제공
  if (!window.matchMedia) {
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
  }
});
