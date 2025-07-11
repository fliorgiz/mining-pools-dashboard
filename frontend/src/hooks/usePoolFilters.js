import { useMemo } from 'react';

export const usePoolFilters = (pools, searchTerm, sortBy, sortOrder, filterStatus) => {
  return useMemo(() => {
    if (!pools || pools.length === 0) return [];

    let filtered = [...pools];

    if (searchTerm?.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(pool =>
        pool.name.toLowerCase().includes(term)
      );
    }

    if (filterStatus && filterStatus !== 'all') {
      filtered = filtered.filter(pool => pool.status === filterStatus);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [pools, searchTerm, sortBy, sortOrder, filterStatus]);
}; 