import { useRef } from "react";
import { Character } from "../../lib/types";
import styles from "./CharacterList.module.css";
import { useCharacterStore } from "./store/character-store";

export function CharacterList() {
  const {
    displayedCharacters,
    favorites,
    searchTerm,
    setSelectedCharacter,
    toggleFavorite,
    setSearchTerm,
    toggleShowFavorites,
    showingFavorites,
  } = useCharacterStore();

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleToggleFavorite = (character: Character) => {
    toggleFavorite(character);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleToggleShowFavorites = () => {
    toggleShowFavorites();
  };

  const scrollUp = () => {
    scrollRef.current?.scrollBy({ top: -200, behavior: "smooth" });
  };

  const scrollDown = () => {
    scrollRef.current?.scrollBy({ top: 200, behavior: "smooth" });
  };

  const isFavorite = (character: Character) => {
    return favorites.some((fav) => fav.id === character.id);
  };

  return (
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

      <div className={styles.containergrid}>
        <div className={styles.grid} ref={scrollRef}>
          {displayedCharacters.length > 0 &&
            displayedCharacters.map((c) => (
              <div
                key={c.id}
                className={styles.card}
                onClick={() => handleCharacterClick(c)}
              >
                <h3>{c.name}</h3>
                <img src={c.image} alt={c.name} className={styles.cardImage} />
                <button
                  onClick={() => handleToggleFavorite(c)}
                  className={`${styles.favoriteButton} ${
                    isFavorite(c) ? styles.favorited : ""
                  }`}
                  title={
                    isFavorite(c) ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  {isFavorite(c) ? "❤️" : "🤍"}
                </button>
              </div>
            ))}
        </div>
        <div className={styles.containerArrow}>
          {/* 🔼 up */}
          <button className={styles.arrowButton} onClick={scrollUp}>
            ▲
          </button>

          {/* 🔽 down */}
          <button className={styles.arrowButton} onClick={scrollDown}>
            ▼
          </button>
        </div>
      </div>
      <div className={styles.containerButton}>
        <button
          className={`${styles.favButton} ${
            showingFavorites ? styles.favorited : ""
          }`}
          onClick={handleToggleShowFavorites}
        >
          FAVS
        </button>
      </div>
    </div>
  );
}
