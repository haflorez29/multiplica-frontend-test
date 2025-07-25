import { act } from "@testing-library/react";
import { useCharacterStore } from "./character-store";
import { Character } from "../../../lib/types";

const mockCharacters: Character[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    image: "/rick.png",
    species: "Human",
    status: "Alive",
    gender: "Male",
    type: "",
    origin: {
      name: "",
      url: "",
    },
    location: {
      name: "",
      url: "",
    },
    episode: [],
    url: "",
    created: "",
  },
];

const characters: Character[] = [
    {
      id: 1,
      name: "Rick Sanchez",
      image: "/rick.png",
      species: "Human",
      status: "Alive",
      gender: "Male",
      type: "",
      origin: {
        name: "",
        url: "",
      },
      location: {
        name: "",
        url: "",
      },
      episode: [],
      url: "",
      created: "",
    },
    {
        id: 1,
        name: "Morty Smith",
        image: "/morty.png",
        species: "Human",
        status: "Dead",
        gender: "Male",
        type: "",
        origin: {
          name: "",
          url: "",
        },
        location: {
          name: "",
          url: "",
        },
        episode: [],
        url: "",
        created: "",
      }
  ];

beforeEach(() => {
  // reset state before each test
  useCharacterStore.setState({
    characters: [],
    displayedCharacters: [],
    selectedCharacter: null,
    favorites: [],
    showingFavorites: false,
    searchTerm: "",
  });
});

describe("Character Store", () => {
  test("should initialize characters and set first as selected", () => {
    act(() => {
      useCharacterStore
        .getState()
        .initializeCharacters(characters);
    });

    const state = useCharacterStore.getState();

    expect(state.characters).toHaveLength(2);
    expect(state.displayedCharacters).toHaveLength(2);
    expect(state.selectedCharacter).toEqual(characters[0]);
  });

  test("should toggle favorite character", () => {
    act(() => {
      useCharacterStore.getState().toggleFavorite(characters[0]);
    });

    expect(useCharacterStore.getState().favorites).toContainEqual(characters[0]);

    act(() => {
      useCharacterStore.getState().toggleFavorite(characters[0]);
    });

    expect(useCharacterStore.getState().favorites).not.toContainEqual(
        characters[0]
    );
  });

  test("should apply search filter to displayedCharacters", () => {
    act(() => {
      useCharacterStore
        .getState()
        .initializeCharacters(characters);
    });

    act(() => {
      useCharacterStore.getState().setSearchTerm("morty");
    });

    const { displayedCharacters } = useCharacterStore.getState();
    expect(displayedCharacters).toHaveLength(1);
    expect(displayedCharacters[0].name).toBe("Morty Smith");
  });

  test("should toggle between all and favorites when toggling showFavorites", () => {
    act(() => {
      useCharacterStore
        .getState()
        .initializeCharacters(characters);
    });

    act(() => {
      useCharacterStore.getState().toggleFavorite(characters[1]);
    });

    act(() => {
      useCharacterStore.getState().toggleShowFavorites();
    });

    const state = useCharacterStore.getState();
    expect(state.displayedCharacters).toHaveLength(1);
    expect(state.displayedCharacters[0]).toEqual(characters[1]);
    expect(state.showingFavorites).toBe(true);
  });
});
