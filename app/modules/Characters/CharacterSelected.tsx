import styles from "./CharacterSelected.module.css";
import Image from "next/image";
import { useCharacterStore } from "./store/character-store";

export function CharacterSelected() {
  const { selectedCharacter } = useCharacterStore();

  return (
    <>
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
            {selectedCharacter.status == "Alive" ? "VIVO" : "MUERTO"}
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
    </>
  );
}
