import { renderHook, act } from '@testing-library/react';
import useDebounce from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('returns debounced value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'pik', delay: 300 },
      }
    );

    expect(result.current).toBe('pik');

    rerender({ value: 'pikachu', delay: 300 });
    expect(result.current).toBe('pik');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('pikachu');
  });
});
