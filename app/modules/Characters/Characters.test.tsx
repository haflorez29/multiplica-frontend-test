import { render, screen } from "@testing-library/react";
import { CharacterPage } from "./Characters";
import "@testing-library/jest-dom";
import { Character } from "../../lib/types";

const mockInitializeCharacters = jest.fn();

jest.mock("./store/character-store", () => ({
  useCharacterStore: () => ({
    initializeCharacters: mockInitializeCharacters,
    displayedCharacters: [],
  }),
}));

describe("CharacterPage", () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should show component", () => {
    const { container } = render(<CharacterPage initialCharacters={[]} />);
    expect(container).toBeInTheDocument();
  });

  test("should display the logo image with alt text", () => {
    render(<CharacterPage initialCharacters={mockCharacters} />);
    expect(screen.getByAltText("Rick and Morty logo")).toBeInTheDocument();
  });

  test("should call initializeCharacters with initial data", () => {
    render(<CharacterPage initialCharacters={mockCharacters} />);
    expect(mockInitializeCharacters).toHaveBeenCalledWith(mockCharacters);
  });

  test("should not call initializeCharacters if initialCharacters is empty", () => {
    render(<CharacterPage initialCharacters={[]} />);
    expect(mockInitializeCharacters).not.toHaveBeenCalled();
  });
});
