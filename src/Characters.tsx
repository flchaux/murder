import { Character } from "./character";
import { CharacterCard } from "./CharacterCard";

export function Characters({ characters }: { characters: Character[] }) {
    return <div>
        {characters.map(character => <CharacterCard character={character} />)}
    </div>

}