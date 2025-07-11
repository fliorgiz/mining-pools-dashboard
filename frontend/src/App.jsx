import { useEffect, useCallback } from 'react';
import { fetchMiningPools } from './services/api';
import { useApp } from './context/AppContext';
import { usePoolFilters } from './hooks/usePoolFilters';
import MiningPoolsTable from './components/MiningPoolsTable';
import PoolDetailsModal from './components/PoolDetailsModal';
import ThemeLanguageToggle from './components/ThemeLanguageToggle';
import TableFilters from './components/TableFilters';

const App = () => {
  const { 
    pools, 
    loading, 
    error, 
    searchTerm, 
    sortBy, 
    sortOrder, 
    filterStatus,
    dispatch, 
    t 
  } = useApp();

  const filteredPools = usePoolFilters(pools, searchTerm, sortBy, sortOrder, filterStatus);

  const loadPools = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await fetchMiningPools();
      dispatch({ type: 'SET_POOLS', payload: data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  }, [dispatch]);

  const handleRowClick = useCallback((pool) => {
    dispatch({ type: 'OPEN_MODAL', payload: pool });
  }, [dispatch]);

  useEffect(() => {
    loadPools();
  }, [loadPools]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white min-w-0 flex-shrink-0">
            {t('title')}
          </h1>
          <div className="flex-shrink-0">
            <ThemeLanguageToggle />
          </div>
        </div>
        
        <div className="min-w-0">
          <TableFilters />
          
          <MiningPoolsTable
            pools={filteredPools}
            loading={loading}
            error={error}
            onRowClick={handleRowClick}
          />
        </div>
        
        <PoolDetailsModal />
      </div>
    </div>
  );
};

export default App;