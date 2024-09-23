import { KonvaEventObject } from "konva/lib/Node";
import { Group, Rect, Text } from "react-konva";
import { invertColor } from "./color";
import { Theme } from "./theme";
import { Position } from "./position";

export function ThemeShape({ position, color, data, onDragEnd }: { position: Position, color: string, data: Theme, onDragEnd: (e: KonvaEventObject<DragEvent>) => void }) {
    const width = 100;
    const height = 100;
    return <Group
        x={position.x}
        y={position.y}
        draggable
        onDragMove={onDragEnd}
    >
        <Rect
            x={-width / 2}
            y={-height / 2}
            width={width}
            height={height}
            fill={color}
            cornerRadius={10}
            stroke={invertColor(color)}
        />
        <Text width={width} height={height} x={-width / 2} y={-height / 2} fontVariant="bold" fontSize={14} verticalAlign="middle" align="center" text={data.name} fill={invertColor(color)} />
    </Group>
}