import { Box, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const shift = { x: 5, y: 3 };
const lineSize = shift.x * 2 + 1;

function randomChar() {
    return Math.random() > 0.2 ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : ' ';
}

export function Encoder() {
    const [value, setValue] = useState("");
    const [encoded, setEncoded] = useState<string[][]>([[]]);
    const maxLenght = ((shift.x + 1) * shift.y) * 2;
    useEffect(() => {
        let e = Array.from({ length: shift.y * 2 }, () => Array.from({ length: lineSize }, () => randomChar()));
        let x = 0;
        let y = 0;
        for (let i = 0; i < value.slice(0, maxLenght).length; i += 2) {
            e[y][x] = value[i];
            if (i + 1 >= value.length) break;
            e[y + shift.y][x + shift.x] = value[i + 1];
            x = (x + 1) % (shift.x + 1);
            if (x == 0) {
                y++;
            }
        }
        setEncoded(e);
    }, [value]);

    return <Stack spacing={1} margin={2}>
        Text to encode
        <TextField multiline value={value} onChange={(v) => setValue(v.target.value)} />
        {value.length} / {maxLenght}<br />
        Text encoded
        <Box>
            <table>
                {encoded.map((e, x) => (
                    <tr key={x}>
                        {e.map((c, y) => (
                            <td key={y} style={{ width: 50, height: 50, textAlign: "center" }}>{c}</td>
                        ))}
                    </tr>)
                )}
            </table></Box>
    </Stack>
}

