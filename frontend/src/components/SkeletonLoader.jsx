import { useApp } from '../context/AppContext';

const SkeletonLoader = () => {
  const { t } = useApp();

  return (
    <div className="animate-pulse">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg table-fixed">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              </th>
              <th className="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              </th>
              <th className="w-36 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
              </th>
              <th className="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              </th>
              <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-16"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkeletonLoader;