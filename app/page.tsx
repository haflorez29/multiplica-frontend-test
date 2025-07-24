import { getCharacters } from "rickmortyapi";
import styles from "./page.module.css";
import Image from "next/image";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  url: string;
}

export default async function CharactersPage() {
  const res = await getCharacters();
  const characters: Character[] = res.data?.results ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src="/images/logo.png"
          alt="Rick and Morty logo"
          width={300}
          height={200}
        />
      </div>

      <div className={styles.grid}>
        {characters.map((character) => (
          <div key={character.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img
                src={character.image || "/placeholder.svg"}
                alt={character.name}
                className={styles.image}
              />
              <div
                className={`${styles.status} ${
                  styles[character.status.toLowerCase()]
                }`}
              >
                {character.status}
              </div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.name}>{character.name}</h3>
              <p className={styles.species}>
                {character.species} • {character.gender}
              </p>
              <div className={styles.location}>
                <strong>Origin:</strong> {character.origin.name}
              </div>
              <div className={styles.location}>
                <strong>Location:</strong> {character.location.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
