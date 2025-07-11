const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'online':
          return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'degraded':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        case 'offline':
          return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        default:
          return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      }
    };
  
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
        {status}
      </span>
    );
  };
  
  export default StatusBadge;