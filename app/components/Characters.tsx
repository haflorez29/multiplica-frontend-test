"use client";
import { useEffect } from "react";
import { Character } from "../lib/types";
import styles from "./Characters.module.css";
import Image from "next/image";
import { useCharacterStore } from "../lib/store/character-store";

export function CharacterPage({
  initialCharacters,
}: {
  initialCharacters: Character[];
}) {
  const {
    displayedCharacters,
    selectedCharacter,
    favorites,
    searchTerm,
    initializeCharacters,
    setSelectedCharacter,
    toggleFavorite,
    toggleShowFavorites,
    setSearchTerm,
  } = useCharacterStore();

  useEffect(() => {
    if (initialCharacters.length > 0) {
      initializeCharacters(initialCharacters);
    }
  }, [initialCharacters, initializeCharacters]);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleToggleFavorite = (character: Character) => {
    toggleFavorite(character);
  };

  const handleToggleShowFavorites = () => {
    toggleShowFavorites();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const isFavorite = (character: Character) => {
    return favorites.some((fav) => fav.id === character.id);
  };

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
        {selectedCharacter && (
          <div className={styles.detail}>
            <Image
              src={selectedCharacter.image}
              alt={selectedCharacter.name}
              width={400}
              height={400}
              className={styles.detailImage}
            />

            <div className={styles.liveBadge}>
              <span
                className={
                  selectedCharacter.status == "Alive"
                    ? styles.liveDot
                    : styles.deadDot
                }
              />{" "}
              {selectedCharacter.status}
            </div>

            <div className={styles.detailOverlay}>
              <div>
                <div className={styles.label}>{selectedCharacter.name}</div>
                <div>{selectedCharacter.species}</div>
                <div>{selectedCharacter.status}</div>
              </div>
              <div className={styles.tags}>
                <div>
                  <span className={styles.label}>Origin</span>
                  <div>{selectedCharacter.origin.name}</div>
                </div>
                <div>
                  <span className={styles.label}>Location</span>
                  <div>{selectedCharacter.location.name}</div>
                </div>
                <div>
                  <span className={styles.label}>Gender</span>
                  <div>{selectedCharacter.gender}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* characters */}
        <div className={styles.gridArea}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Find your character..."
              className={styles.search}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className={styles.grid}>
            {displayedCharacters.length > 0 &&
              displayedCharacters.map((c) => (
                <div
                  key={c.id}
                  className={styles.card}
                  onClick={() => handleCharacterClick(c)}
                >
                  <h3>{c.name}</h3>
                  <img
                    src={c.image}
                    alt={c.name}
                    className={styles.cardImage}
                  />
                  <button
                    onClick={() => handleToggleFavorite(c)}
                    className={`${styles.favoriteButton} ${
                      isFavorite(c) ? styles.favorited : ""
                    }`}
                    title={
                      isFavorite(c)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    {isFavorite(c) ? "❤️" : "🤍"}
                  </button>
                </div>
              ))}
          </div>
          <div className={styles.containerButton}>
            <button
              className={styles.favButton}
              onClick={handleToggleShowFavorites}
            >
              FAVS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
