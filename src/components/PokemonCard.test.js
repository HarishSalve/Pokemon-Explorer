import { fireEvent, render, screen } from '@testing-library/react';
import PokemonCard from './PokemonCard';

const sample = {
  id: 25,
  name: 'pikachu',
  image: 'https://example.com/pikachu.png',
  types: ['electric'],
  stats: [
    { name: 'hp', value: 35 },
    { name: 'attack', value: 55 },
    { name: 'speed', value: 90 },
  ],
};

describe('PokemonCard', () => {
  it('renders name, types, and calls handlers', () => {
    const onSelect = jest.fn();
    const onToggleFavorite = jest.fn();

    render(
      <PokemonCard
        pokemon={sample}
        onSelect={onSelect}
        onToggleFavorite={onToggleFavorite}
        isFavorite={false}
      />
    );

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('article'));
    expect(onSelect).toHaveBeenCalledWith(sample);

    fireEvent.click(screen.getByLabelText(/add to favorites/i));
    expect(onToggleFavorite).toHaveBeenCalledWith(sample);
  });
});
