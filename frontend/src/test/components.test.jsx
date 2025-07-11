import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../components/StatusBadge';

describe('StatusBadge Component', () => {
  it('renders online status correctly', () => {
    render(<StatusBadge status="online" />);
    expect(screen.getByText('online')).toBeInTheDocument();
  });

  it('renders offline status correctly', () => {
    render(<StatusBadge status="offline" />);
    expect(screen.getByText('offline')).toBeInTheDocument();
  });
});
