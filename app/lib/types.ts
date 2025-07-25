export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface CharacterState {
  // State
  characters: Character[]
  displayedCharacters: Character[]
  selectedCharacter: Character | null
  favorites: Character[]
  showingFavorites: boolean
  searchTerm: string

  // Actions
  initializeCharacters: (characters: Character[]) => void
  setSelectedCharacter: (character: Character) => void
  toggleFavorite: (character: Character) => void
  toggleShowFavorites: () => void
  setSearchTerm: (term: string) => void
}