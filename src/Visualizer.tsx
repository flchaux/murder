import { Stage, Layer } from "react-konva";
import { CharacterShape } from "./CharacterShape";
import { Link } from "./Link";
import { ThemeShape } from "./ThemeShape";
import { Character } from "./character";
import { Theme } from "./theme";
import { Position, PositionMap } from "./position";

export function Visualizer({ characters, themes,
    objectPositions,
    setObjectPositions }:
    {
        characters: Character[],
        themes: Theme[],
        objectPositions: PositionMap,
        setObjectPositions: React.Dispatch<React.SetStateAction<PositionMap>>
    }) {
    return <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
            {characters.map((character) => {
                return [
                    ...character.themes.map((theme) => {
                        return <Link key={theme}
                            color="#FF2020"
                            start={objectPositions[character.id]}
                            end={objectPositions[theme]} />
                    }),
                    ...character.links.map((link, i) => {
                        return <Link
                            key={character.id + "->" + link}
                            color="#5a5a5a"
                            start={objectPositions[character.id]}
                            end={objectPositions[link.characterId]} />
                    })
                ];
            })}
        </Layer>
        <Layer>
            {characters.map((character) => (
                <CharacterShape
                    position={objectPositions[character.id]}
                    onDragEnd={(e) => {
                        setObjectPositions((c) => {
                            c[character.id] = { x: e.target.x(), y: e.target.y() };
                            return { ...c };
                        });
                    }} key={character.id} color="#FC9E56" data={character} />
            ))}
        </Layer>
        <Layer>
            {themes.map((theme) => (
                <ThemeShape
                    position={objectPositions[theme.id]}
                    key={theme.id} data={theme} color="#56B5FC" onDragEnd={(e) => {
                        setObjectPositions((c) => {
                            c[theme.id] = { x: e.target.x(), y: e.target.y() };
                            return { ...c };
                        });
                    }} />
            ))}
        </Layer>
    </Stage>
}