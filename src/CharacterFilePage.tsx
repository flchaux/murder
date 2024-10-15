import { Attachment } from "airtable";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Character } from "./character";
import { CharacterFileParams } from "./characterFile";
import { CharacterFile } from "./CharacterFile";
import { useAirtable } from "./useAirtable";

export function CharacterFilePage() {
    const { characterId } = useLoaderData() as { characterId: string };
    const base = useAirtable();
    const [character, setCharacter] = useState<CharacterFileParams | undefined>();
    useEffect(() => {
        (async () => {
            const character = await base.table("Characters").find(characterId);
            const picture = (character.get("Photo") as Attachment[])[0].url;
            await base.table("CharacterLinks").select().all();
            const linkMaps = await base.table("CharacterLinks").select({
                filterByFormula: `SourceName = "${character.get("Name")}"`,
            }).all();
            console.log(linkMaps)
            const links: CharacterFileParams["links"] = linkMaps.map((l) => ({
                description: l.get("Description") as string,
                picture: (l.get("Picture") as Attachment[])[0].url,
                name: l.get("DestinationName") as string,
                anonymous: l.get("Anonyme") as boolean,
            }));
            setCharacter({
                publicRole: character.get("Role publique") as string,
                name: character.get("Name") as string,
                picture: picture,
                summary: character.get("Summary") as string,
                secret: character.get("Secret") as string,
                history: character.get("History") as string,
                personalGoal: character.get("PersonalGoals") as string,
                comment: character.get("Comment") as string,
                links: links,
            });
        })();
    }, []);
    return character ? <CharacterFile character={character} /> : <div>Loading...</div>;
}