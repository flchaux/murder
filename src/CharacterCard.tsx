import { Stack } from "@mui/material";
import { Character } from "./character";

export function CharacterCard({ character }
    : { character: Character }
) {
    return <Stack>
        <h2>{character.name}</h2>
        <p><strong>Rôle publique:</strong> {character.publicRole}</p>
        <p><strong>Rôle caché:</strong> {character.hiddenRole}</p>
        <p><strong>Mobile:</strong> {character.mobile}</p>
        <p><strong>Objectif personnel:</strong> {character.personalGoal}</p>
        <p><strong>Accessoires:</strong> {character.accessories}</p>
        <p><strong>Description:</strong> {character.description}</p>
    </Stack>
}