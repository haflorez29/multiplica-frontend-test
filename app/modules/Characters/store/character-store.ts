import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Character, CharacterState } from "../../../lib/types";

const applySearch = (characters: Character[], searchTerm: string) => {
  if (searchTerm.trim() === "") return characters;

  return characters.filter(
    (character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.origin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const useCharacterStore = create<CharacterState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        characters: [],
        displayedCharacters: [],
        selectedCharacter: null,
        favorites: [],
        showingFavorites: false,
        searchTerm: "",

        // Actions
        initializeCharacters: (characters) => {
          set({
            characters,
            displayedCharacters: characters,
            selectedCharacter: characters.length > 0 ? characters[0] : null,
          });
        },

        setSelectedCharacter: (character) => {
          set({ selectedCharacter: character });
        },

        toggleFavorite: (character) => {
          const { favorites } = get();
          const isFavorite = favorites.some((fav) => fav.id === character.id);

          if (isFavorite) {
            set({
              favorites: favorites.filter((fav) => fav.id !== character.id),
            });
          } else {
            set({
              favorites: [...favorites, character],
            });
          }
        },

        toggleShowFavorites: () => {
          const { showingFavorites, characters, favorites, searchTerm } = get();
          const newShowingFavorites = !showingFavorites;
          const baseCharacters = newShowingFavorites ? favorites : characters;
          const filteredCharacters = applySearch(baseCharacters, searchTerm);

          set({
            showingFavorites: newShowingFavorites,
            displayedCharacters: filteredCharacters,
            selectedCharacter:
              filteredCharacters.length > 0 ? filteredCharacters[0] : null,
          });
        },

        setSearchTerm: (term) => {
          const { characters, favorites, showingFavorites } = get();
          const baseCharacters = showingFavorites ? favorites : characters;
          const filteredCharacters = applySearch(baseCharacters, term);

          set({
            searchTerm: term,
            displayedCharacters: filteredCharacters,
            selectedCharacter:
              filteredCharacters.length > 0
                ? filteredCharacters.find(
                    (char) => char.id === get().selectedCharacter?.id
                  ) || filteredCharacters[0]
                : null,
          });
        },
      }),
      {
        name: "character-store",
        partialize: (state) => ({
          favorites: state.favorites,
        }),
      }
    ),
    {
      name: "character-store",
    }
  )
);
