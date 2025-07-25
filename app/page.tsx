import { getCharacters } from "rickmortyapi";
import { Character } from "./lib/types";
import { CharacterPage } from "./modules/Characters/Characters";

export default async function Page() {
  let characters: Character[] = [];
  try {
    // Server-side data fetching
    const response = await getCharacters();
    if (!response.status) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    characters = response.data?.results ?? [];
  } catch (error) {
    console.error("Error fetching characters:", error);
  }

  return <CharacterPage initialCharacters={characters} />;
}
