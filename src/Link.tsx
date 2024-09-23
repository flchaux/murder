import { Line } from "react-konva";

export function Link({ color, start, end }: { color: string, start: { x: number, y: number }, end: { x: number, y: number } }) {
    return <Line
        x={start.x}
        y={start.y}
        points={[0, 0, end.x - start.x, end.y - start.y]}
        radius={50}
        stroke={color}
        listening={false}
    />
}