import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPoolDetails } from '../services/api';
import { useApp } from '../context/AppContext';

const PoolDetailsModal = () => {
  const { selectedPool, isModalOpen, dispatch, t } = useApp();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const abortControllerRef = useRef(null);

  const closeModal = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    dispatch({ type: 'CLOSE_MODAL' });
    setDetails(null);
    setError('');
  }, [dispatch]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }, [closeModal]);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    if (isModalOpen && selectedPool?.id) {
      abortControllerRef.current = new AbortController();
      setLoading(true);
      setError('');
      
      fetchPoolDetails(selectedPool.id)
        .then(data => {
          if (!abortControllerRef.current?.signal.aborted) {
            setDetails(data);
          }
        })
        .catch(err => {
          if (!abortControllerRef.current?.signal.aborted) {
            setError(err.message);
          }
        })
        .finally(() => {
          if (!abortControllerRef.current?.signal.aborted) {
            setLoading(false);
          }
        });
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [isModalOpen, selectedPool?.id]);

  if (!isModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-200 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {selectedPool?.name} {t('details')}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {loading && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="animate-pulse bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-2/3"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {error && (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Ошибка загрузки
              </h3>
              <p className="text-red-600 dark:text-red-400 mb-4">
                {error}
              </p>
              <button
                onClick={() => {
                  setError('');
                  if (selectedPool?.id) {
                    setLoading(true);
                    fetchPoolDetails(selectedPool.id)
                      .then(data => setDetails(data))
                      .catch(err => setError(err.message))
                      .finally(() => setLoading(false));
                  }
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Попробовать снова
              </button>
            </div>
          )}
          
          {details && !loading && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                    {t('revenue24h')}
                  </span>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {details.last24hRevenueBTC.toFixed(3)} BTC
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                    {t('uptime')}
                  </span>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {details.uptimePercent.toFixed(1)}%
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                    {t('location')}
                  </span>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {details.location}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                    {t('fee')}
                  </span>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {details.feePercent}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoolDetailsModal; 