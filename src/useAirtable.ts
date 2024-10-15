import Airtable, { Base } from "airtable";
import { useMemo } from "react";

export function useAirtable() {
    const airtable = new Airtable({
        apiKey: process.env.REACT_APP_AIRTABLE_TOKEN
    })
    return useMemo(() => new Base(airtable, process.env.REACT_APP_AIRTABLE_BASE!), []);
}