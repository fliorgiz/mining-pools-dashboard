import { createContext, useContext, useReducer, useCallback, useMemo } from 'react';

const AppContext = createContext();

const translations = {
  en: {
    title: 'Mining Pools',
    name: 'Name',
    hashrate: 'Hashrate (TH/s)',
    activeWorkers: 'Active Workers',
    rejectRate: 'Reject Rate (%)',
    status: 'Status',
    details: 'Details',
    revenue24h: '24h Revenue (BTC)',
    uptime: 'Uptime',
    location: 'Location',
    fee: 'Fee',
    loading: 'Loading...',
    error: 'Error',
    close: 'Close',
    light: 'Light',
    dark: 'Dark',
    search: 'Search pools...',
    sortBy: 'Sort by',
    filterBy: 'Filter by status',
    allStatuses: 'All statuses',
    online: 'online',
    degraded: 'degraded',
    offline: 'offline'
  },
  ru: {
    title: 'Майнинг Пулы',
    name: 'Имя',
    hashrate: 'Хешрейт (TH/s)',
    activeWorkers: 'Активные пулы',
    rejectRate: 'Процент отклонений (%)',
    status: 'Статус',
    details: 'Детали',
    revenue24h: 'Доход за 24ч (BTC)',
    uptime: 'Время работы',
    location: 'Местоположение',
    fee: 'Комиссия',
    loading: 'Загрузка...',
    error: 'Ошибка',
    close: 'Закрыть',
    light: 'Светлая',
    dark: 'Темная',
    search: 'Поиск пулов...',
    sortBy: 'Сортировать по',
    filterBy: 'Фильтр по статусу',
    allStatuses: 'Все статусы',
    online: 'онлайн',
    degraded: 'нестабильно',
    offline: 'оффлайн'
  }
};

const initialState = {
  pools: [],
  loading: false,
  error: null,
  selectedPool: null,
  isModalOpen: false,
  theme: 'light',
  language: 'en',
  searchTerm: '',
  sortBy: 'name',
  sortOrder: 'asc',
  filterStatus: 'all'
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_POOLS':
      return { 
        ...state, 
        pools: action.payload, 
        loading: false,
        error: null 
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'OPEN_MODAL':
      return { ...state, selectedPool: action.payload, isModalOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, selectedPool: null, isModalOpen: false };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload };
    case 'SET_SORT':
      return { 
        ...state, 
        sortBy: action.payload.field, 
        sortOrder: action.payload.order 
      };
    case 'SET_FILTER':
      return { ...state, filterStatus: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const t = useCallback((key) => {
    return translations[state.language]?.[key] || key;
  }, [state.language]);

  const value = useMemo(() => ({
    ...state,
    dispatch,
    t
  }), [state, dispatch, t]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}; 