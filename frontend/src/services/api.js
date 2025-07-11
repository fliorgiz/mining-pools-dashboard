import axios from 'axios';

// В Docker API доступен через nginx proxy на том же домене
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // В Docker через nginx proxy
  : 'http://localhost:3001/api'; // Для локальной разработки

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let controllers = new Map();

const createCancelToken = (key) => {
  if (controllers.has(key)) {
    controllers.get(key).abort();
  }
  
  const controller = new AbortController();
  controllers.set(key, controller);
  
  return controller.signal;
};

apiClient.interceptors.request.use(
  (config) => {
    console.log(`${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message);
      return Promise.reject(error);
    }
    
    console.error('Response Error:', error.response?.status, error.message);
    
    let errorMessage = 'Произошла ошибка';
    
    if (error.response?.status === 404) {
      errorMessage = error.response.data?.message || 'Пул не найден';
    } else if (error.response?.status >= 500) {
      errorMessage = 'Ошибка сервера. Попробуйте позже.';
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Превышено время ожидания';
    } else if (!error.response) {
      errorMessage = 'Нет соединения с сервером';
    } else if (error.response.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    throw new Error(errorMessage);
  }
);

export const fetchMiningPools = async () => {
  try {
    const cancelToken = createCancelToken('mining-pools');
    const response = await apiClient.get('/mining-pools', {
      signal: cancelToken
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw error;
    }
    throw new Error(error.message || 'Не удалось загрузить список пулов');
  }
};

export const fetchPoolDetails = async (poolId) => {
  try {
    const cancelToken = createCancelToken(`pool-${poolId}`);
    const response = await apiClient.get(`/mining-pools/${poolId}`, {
      signal: cancelToken
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw error;
    }
    throw new Error(error.message || 'Не удалось загрузить детали пула');
  }
};

export const cancelRequest = (key) => {
  if (controllers.has(key)) {
    controllers.get(key).abort();
    controllers.delete(key);
  }
};

export const cancelAllRequests = () => {
  controllers.forEach((controller) => controller.abort());
  controllers.clear();
};