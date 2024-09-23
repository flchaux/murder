import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Character } from './character';
import { Layer, Stage } from 'react-konva';
import { CharacterShape } from './CharacterShape';
import { ThemeShape } from './ThemeShape';
import { Theme } from './theme';
import { Link } from './Link';
import { Visualizer } from './Visualizer';
import Airtable, { Base } from 'airtable';
import { Position, PositionMap } from './position';
import { Tab, Tabs } from '@mui/material';
import { Characters } from './Characters';

const line = 3;
const column = 4;
const themeSpacing = 300;

function App() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);

  const [objectPositions, setObjectPositions] = useState<PositionMap>({});

  useEffect(() => {
    (async () => {
      const airtable = new Airtable({
        apiKey: process.env.REACT_APP_AIRTABLE_TOKEN
      })
      const base = new Base(airtable, process.env.REACT_APP_AIRTABLE_BASE!);
      const themesResults = await base.table("Themes").select().all();
      const charactersResults = await base.table("Characters").select().all();
      const links = await base.table("CharacterLinks").select().all();
      setThemes(themesResults.map((theme, i) => {
        return {
          id: theme.id,
          name: theme.get("Name") as string,
        }
      }));
      setCharacters(charactersResults.map((character) => {
        return {
          id: character.id,
          name: character.get("Name") as string,
          themes: character.get("Theme") as string[] ?? [],
          publicRole: character.get("Role publique") as string,
          hiddenRole: character.get("Role caché") as string,
          description: character.get("Description") as string,
          mobileType: character.get("Type de mobile") as string,
          mobile: character.get("Mobile") as string,
          personalGoal: character.get("Objectif personnel") as string,
          accessories: character.get("Accessoire") as string,
          links: (character.get("LinksSource") as string[] ?? []).map((linkId) => ({
            id: linkId,
            characterId: links.find((link) => link.id === linkId)?.get("Destination") as string,
          })),
        }
      }));
      // setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (themes.length === 0 || characters.length === 0) {
      return;
    }
    const charactersByTheme: { [key: string]: Character[] } = characters.reduce((acc, character) => {
      for (const theme of character.themes) {
        if (!acc[theme]) {
          acc[theme] = [];
        }
        acc[theme].push(character);
      }
      return acc;
    }, {} as { [key: string]: Character[] });
    const positions: PositionMap = themes.reduce((acc, theme, i) => {
      const themePosition = {
        x: (i % column) * themeSpacing + window.innerWidth / 2 - (themeSpacing * (column - 1)) / 2,
        y: (Math.floor(i / line)) * themeSpacing + window.innerHeight / 2 - (themeSpacing * (line - 1)) / 2
      };
      acc[theme.id] = themePosition;
      const characters = charactersByTheme[theme.id] ?? [];
      let characterIndex = 0;
      for (const character of characters) {
        acc[character.id] = {
          x: themePosition.x + Math.cos(Math.PI * 2 / characters.length * characterIndex) * 150,
          y: themePosition.y + Math.sin(Math.PI * 2 / characters.length * characterIndex) * 150,
        };
        characterIndex++;
      }
      return acc;
    }, {} as PositionMap);
    let i = 0;
    for (const character of characters) {
      if (!positions[character.id]) {
        positions[character.id] = { y: window.innerHeight - themeSpacing, x: i * 200 + 200 };
        i++;
      }
    }
    setObjectPositions(positions);
    setLoading(false);
  }, [themes, characters]);
  const [tab, setTab] = useState(0);

  return <>{!loading &&
    (<div>
      <Tabs value={tab} onChange={(e, newTab) => setTab(newTab)}>
        <Tab label="Graph" />
        <Tab label="Characters" />
      </Tabs>
      {tab === 0 && (<Visualizer
        characters={characters}
        themes={themes}
        objectPositions={objectPositions}
        setObjectPositions={setObjectPositions}
      />)}
      {tab === 1 && (<Characters
        characters={characters}
      />)}
    </div>)}</>;
}

export default App;
