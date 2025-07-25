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
  const character = characters[0]; // muestra por ahora el primero

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

      <div className={styles.panel}>
        {/*character*/}
        <div className={styles.detail}>
          <Image
            src={character.image}
            alt={character.name}
            width={400}
            height={400}
            className={styles.detailImage}
          />

          <div className={styles.liveBadge}>
            <span className={styles.liveDot} /> LIVE
          </div>

          <div className={styles.detailOverlay}>
            <div>
              <div className={styles.label}>{character.name}</div>
              <div>{character.species}</div>
              <div>{character.status}</div>
            </div>
            <div className={styles.tags}>
              <div>
                <span className={styles.label}>Origin</span>
                <div>{character.origin.name}</div>
              </div>
              <div>
                <span className={styles.label}>Location</span>
                <div>{character.location.name}</div>
              </div>
              <div>
                <span className={styles.label}>Gender</span>
                <div>{character.gender}</div>
              </div>
            </div>
          </div>
        </div>

        {/* characters */}
        <div className={styles.gridArea}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Find your character..."
              className={styles.search}
            />
          </div>

          <div className={styles.grid}>
            {characters.map((c) => (
              <div key={c.id} className={styles.card}>
                <h3>{c.name}</h3>
                <img src={c.image} alt={c.name} className={styles.cardImage} />
                <button>♡ Like</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
