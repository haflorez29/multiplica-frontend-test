import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterList } from "./CharacterList";
import "@testing-library/jest-dom";
import { Character } from "../../lib/types";

const mockSetSelectedCharacter = jest.fn();
const mockToggleFavorite = jest.fn();
const mockSetSearchTerm = jest.fn();
const mockToggleShowFavorites = jest.fn();

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

jest.mock("./store/character-store", () => ({
  useCharacterStore: () => ({
    displayedCharacters: mockCharacters,
    favorites: [],
    searchTerm: "",
    setSelectedCharacter: mockSetSelectedCharacter,
    toggleFavorite: mockToggleFavorite,
    setSearchTerm: mockSetSearchTerm,
    toggleShowFavorites: mockToggleShowFavorites,
  }),
}));

describe("CharacterList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render search input and FAVS button", () => {
    render(<CharacterList />);

    expect(
      screen.getByPlaceholderText(/find your character/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /favs/i })).toBeInTheDocument();
  });

  test("should render character cards", () => {
    render(<CharacterList />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByAltText("Rick Sanchez")).toHaveAttribute(
      "src",
      "/rick.png"
    );
  });

  test("should call setSelectedCharacter on card click", () => {
    render(<CharacterList />);

    fireEvent.click(screen.getByText("Rick Sanchez"));
    expect(mockSetSelectedCharacter).toHaveBeenCalledWith(mockCharacters[0]);
  });

  test("should call toggleShowFavorites when FAVS button is clicked", () => {
    render(<CharacterList />);

    const favsButton = screen.getByRole("button", { name: /favs/i });
    fireEvent.click(favsButton);
    expect(mockToggleShowFavorites).toHaveBeenCalled();
  });

  test("should update search term on input change", () => {
    render(<CharacterList />);

    const searchInput = screen.getByPlaceholderText(/find your character/i);
    fireEvent.change(searchInput, { target: { value: "Summer" } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith("Summer");
  });
});
