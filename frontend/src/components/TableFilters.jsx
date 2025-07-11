import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const CustomSelect = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 pr-8 text-left bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors outline-none"
      >
        {selectedOption ? selectedOption.label : placeholder}
      </button>
      
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const TableFilters = () => {
  const { searchTerm, sortBy, sortOrder, filterStatus, dispatch, t } = useApp();

  const handleSearchChange = (e) => {
    dispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const clearSearch = () => {
    dispatch({ type: 'SET_SEARCH', payload: '' });
  };

  const handleSortChange = (value) => {
    const [field, order] = value.split('-');
    dispatch({ type: 'SET_SORT', payload: { field, order } });
  };

  const handleFilterChange = (value) => {
    dispatch({ type: 'SET_FILTER', payload: value });
  };

  const sortOptions = [
    { value: 'name-asc', label: `${t('name')} A-Z` },
    { value: 'name-desc', label: `${t('name')} Z-A` },
    { value: 'hashrateTHs-desc', label: `${t('hashrate')} ↓` },
    { value: 'hashrateTHs-asc', label: `${t('hashrate')} ↑` },
    { value: 'activeWorkers-desc', label: `${t('activeWorkers')} ↓` },
    { value: 'activeWorkers-asc', label: `${t('activeWorkers')} ↑` },
    { value: 'rejectRate-asc', label: `${t('rejectRate')} ↑` },
    { value: 'rejectRate-desc', label: `${t('rejectRate')} ↓` }
  ];

  const filterOptions = [
    { value: 'all', label: t('allStatuses') },
    { value: 'online', label: t('online') },
    { value: 'degraded', label: t('degraded') },
    { value: 'offline', label: t('offline') }
  ];

  return (
    <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 min-w-0">
          <div className="relative">
            <input
              type="text"
              placeholder={t('search')}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2 md:flex-shrink-0">
          <div className="w-full md:w-[230px]">
            <CustomSelect
              value={`${sortBy}-${sortOrder}`}
              onChange={handleSortChange}
              options={sortOptions}
              placeholder={t('sortBy')}
            />
          </div>
          
          <div className="w-full md:w-[230px]">
            <CustomSelect
              value={filterStatus}
              onChange={handleFilterChange}
              options={filterOptions}
              placeholder={t('filterBy')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableFilters; 