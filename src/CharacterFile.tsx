import { Card, CardContent, CardHeader, CardMedia, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { Character } from "./character";
import { CharacterFileParams } from "./characterFile";


const styles = {
    cardContainer: {
        width: "210mm",
        minHeight: "297mm",
        margin: "auto",
        padding: "20mm",
        borderRadius: "10px",
    } as React.CSSProperties,
    title: {
        textAlign: "center",
        fontSize: "2.5rem",
        color: "#8b4513",
        borderBottom: "2px solid #c19a6b",
        marginBottom: "15px",
        paddingBottom: "10px",
    } as React.CSSProperties,
    role: {
        textAlign: "center",
        fontSize: "1.5rem",
        color: "#6b4226",
        marginBottom: "10px",
    } as React.CSSProperties,
    hiddenRole: {
        textAlign: "center",
        fontSize: "1.3rem",
        color: "#4b2a14",
        fontStyle: "italic",
        marginBottom: "20px",
    } as React.CSSProperties,
    section: {
        marginBottom: "25px",
        padding: "10px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #d4af37",
    } as React.CSSProperties,
};

export function CharacterFile({ character }: {
    character: CharacterFileParams
}) {
    const { publicRole, name, picture, summary, secret, history, personalGoal, comment, links } = character;
    return (
        <div style={styles.cardContainer}>
            <Grid container>
                <Grid>
                    <img style={{ maxWidth: 240 }} src={picture} /></Grid>
                <Grid size="grow">
                    <h1 style={styles.role}>{publicRole}</h1>
                    <h2 style={styles.title}>{name}</h2>
                    <h2 style={styles.hiddenRole}>Secret : {secret}</h2>
                </Grid>
            </Grid>
            <section style={styles.section}>
                <h3>Ton personnage</h3>
                <p>{summary}</p>
            </section>
            <section style={styles.section}>
                <h3>Ton histoire</h3>
                <p>{history}</p>
            </section>
            <section style={styles.section}>
                <h3>Tes objectifs</h3>
                <p>{personalGoal}</p>
            </section>
            <section style={styles.section}>
                <h3>Les personnes que tu connais à la soirée</h3>
                <Grid container direction="row" spacing={1}>
                    {links.map((link) => (
                        <Grid size={4}>
                            <Card sx={{ minHeight: "100%" }}>
                                <CardHeader title={link.anonymous ? "Anonyme" : link.name} />
                                <CardMedia><img src={link.anonymous ? "https://cdn.midjourney.com/adf374a6-e542-458c-8674-0c65fb8814d9/0_0.png" : link.picture} width="100%" /></CardMedia>
                                <CardContent><p>{link.description}</p></CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </section>
            <section style={styles.section}>
                <h3>Quelques mots du Maître du jeu</h3>
                <p>{comment}</p>
            </section>
        </div>
    );
}