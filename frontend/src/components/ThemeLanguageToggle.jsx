import { useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';

const ThemeLanguageToggle = () => {
  const { theme, language, dispatch } = useApp();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    const initialLanguage = savedLanguage || 'en';
    
    dispatch({ type: 'SET_THEME', payload: initialTheme });
    dispatch({ type: 'SET_LANGUAGE', payload: initialLanguage });
    
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, [dispatch]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch({ type: 'SET_THEME', payload: newTheme });
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  }, [theme, dispatch]);

  const toggleLanguage = useCallback(() => {
    const newLanguage = language === 'en' ? 'ru' : 'en';
    dispatch({ type: 'SET_LANGUAGE', payload: newLanguage });
    localStorage.setItem('language', newLanguage);
  }, [language, dispatch]);

  return (
    <div className="flex gap-2">
      <button
        onClick={toggleLanguage}
        className="px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium w-16"
      >
        {language === 'en' ? '🇺🇸 EN' : '🇷🇺 RU'}
      </button>
      
      <button
        onClick={toggleTheme}
        className={`w-16 py-2 rounded-lg transition-colors flex items-center justify-center ${
          theme === 'dark' 
            ? 'bg-gray-600 dark:bg-gray-600 text-yellow-400 hover:bg-gray-500 dark:hover:bg-gray-500' 
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
    </div>
  );
};

export default ThemeLanguageToggle; 