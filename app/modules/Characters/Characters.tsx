"use client";
import { useEffect } from "react";
import { Character } from "../../lib/types";
import styles from "./Characters.module.css";
import Image from "next/image";
import { useCharacterStore } from "./store/character-store";
import { CharacterList } from "./CharacterList";
import { CharacterSelected } from "./CharacterSelected";

export function CharacterPage({
  initialCharacters,
}: {
  initialCharacters: Character[];
}) {
  const { initializeCharacters } = useCharacterStore();

  useEffect(() => {
    if (initialCharacters.length > 0) {
      initializeCharacters(initialCharacters);
    }
  }, [initialCharacters, initializeCharacters]);

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
        <CharacterSelected />
        <CharacterList />
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}
