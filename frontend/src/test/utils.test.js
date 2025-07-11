import { describe, it, expect } from 'vitest';

const formatHashrate = (hashrate) => {
  return hashrate.toLocaleString();
};

const getStatusColor = (status) => {
  switch (status) {
    case 'online':
      return 'green';
    case 'degraded':
      return 'yellow';
    case 'offline':
      return 'red';
    default:
      return 'gray';
  }
};

describe('Utility Functions', () => {
  it('formats hashrate correctly', () => {
    expect(formatHashrate(1000)).toBe('1,000');
    expect(formatHashrate(1500.5)).toBe('1,500.5');
  });

  it('returns correct status colors', () => {
    expect(getStatusColor('online')).toBe('green');
    expect(getStatusColor('degraded')).toBe('yellow');
    expect(getStatusColor('offline')).toBe('red');
    expect(getStatusColor('unknown')).toBe('gray');
  });
}); 