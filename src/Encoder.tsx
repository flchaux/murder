import { Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const shift = 20;

export function Encoder() {
    const [value, setValue] = useState("");
    const [encoded, setEncoded] = useState("");
    const [decoded, setDecoded] = useState("");
    useEffect(() => {
        let e = "";
        for (let i = 0; i < value.length; i++) {
            if (i % 2 === 0) {
                e += value[i].toUpperCase();
            }
            if (i % 2 === 1 && i >= shift) {
                e += value[i - shift].toUpperCase();
            }
        }
        setEncoded(e);
        let d = "";
        for (let i = 0; i < e.length; i++) {
            if (i + shift < e.length) {
                d += e[i];
                d += e[i + shift];
            }
        }
        setDecoded(d);
    }, [value]);
    return <Stack spacing={1} margin={2}>
        Text to encode
        <TextField multiline value={value} onChange={(v) => setValue(v.target.value)} />
        Good encoding
        <TextField multiline />
        Text encoded
        <div style={{ width: 800, border: "solid 1px black", height: 200 }}>{encoded}</div>
        Text decoded
        <div style={{ width: 800, border: "solid 1px black", height: 200 }}>{decoded}</div>
    </Stack>
}

