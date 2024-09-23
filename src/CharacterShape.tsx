import { Circle, Group, Text } from "react-konva";
import { Character } from "./character";
import { invertColor } from "./color";
import { KonvaEventObject } from "konva/lib/Node";
import { Position } from "./position";

export function CharacterShape({ color, data, onDragEnd, position }: { position: Position, color: string, data: Character, onDragEnd: (e: KonvaEventObject<DragEvent>) => void }) {
    const radius = 50;
    return <Group
        x={position.x}
        y={position.y}
        draggable
        onDragMove={onDragEnd}
    >
        <Circle
            x={0}
            y={0}
            radius={radius}
            fill={color}
            stroke={invertColor(color)}
        />
        <Text width={2 * radius} height={2 * radius} x={-radius} y={-radius} verticalAlign="middle" fontVariant="bold" fontSize={14} align="center" text={data.name} fill={invertColor(color)} />
    </Group>
}