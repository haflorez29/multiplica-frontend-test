import { render, screen } from "@testing-library/react";
import { CharacterSelected } from "./CharacterSelected";
import "@testing-library/jest-dom";
import { Character } from "../../lib/types";

const mockCharacter: Character = {
  id: 1,
  name: "Summer Smith",
  image: "/summer.png",
  species: "Human",
  status: "Alive",
  gender: "Female",
  origin: {
    name: "Earth",
    url: "",
  },
  location: {
    name: "Earth C-137",
    url: "",
  },
  type: "",
  episode: [],
  url: "",
  created: "",
};

jest.mock("./store/character-store", () => ({
  useCharacterStore: () => ({
    selectedCharacter: mockCharacter,
  }),
}));

describe("CharacterSelected", () => {
  test("should show selected character info", () => {
    render(<CharacterSelected />);
    const aliveLabels = screen.getAllByText("Alive");
    expect(screen.getByAltText("Summer Smith")).toBeInTheDocument();
    expect(screen.getByText("Summer Smith")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(aliveLabels).toHaveLength(2);
    expect(screen.getByText("Earth")).toBeInTheDocument();
    expect(screen.getByText("Earth C-137")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
  });
});
