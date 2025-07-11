import StatusBadge from './StatusBadge';
import SkeletonLoader from './SkeletonLoader';
import { useApp } from '../context/AppContext';

const MiningPoolsTable = ({ pools, loading, error, onRowClick }) => {
  const { t } = useApp();

  if (loading) return <SkeletonLoader />;
  
  if (error) {
    return (
      <div className="text-center py-8 text-red-600 dark:text-red-400">
        {t('error')}: {error}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md table-fixed">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t('name')}
            </th>
            <th className="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t('hashrate')}
            </th>
            <th className="w-36 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t('activeWorkers')}
            </th>
            <th className="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t('rejectRate')}
            </th>
            <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t('status')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {pools.map((pool) => (
            <tr
              key={pool.id}
              onClick={() => onRowClick(pool)}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white truncate">
                {pool.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                {pool.hashrateTHs.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                {pool.activeWorkers.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                {pool.rejectRate.toFixed(1)}%
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={pool.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MiningPoolsTable;