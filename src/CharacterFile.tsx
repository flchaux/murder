import { Box, Card, CardContent, CardHeader, CardMedia, Stack, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { Character } from "./character";
import { CharacterFileParams } from "./characterFile";
import VintageSection from "./VintageSection";

const lightColor = "#dfd7ce";
const styles = {
    cardContainer: {
        minHeight: "297mm",
        margin: "auto",
        padding: "5mm",
        boxSizing: "border-box",
        fontFamily: "OldNewspaperTypes",
        color: lightColor,
    } as React.CSSProperties,
    role: {
        textAlign: "center",
        fontSize: "2.5rem",
        marginTop: 40,
        color: lightColor,
        fontWeight: "initial",
        fontFamily: "VintageFaith",
    } as React.CSSProperties,
    subTitle: {
        fontfamily: "'Luckiest Guy', cursive",
        fontSize: "20px",
        marginTop: -5,
    } as React.CSSProperties,
    secret: {
        marginTop: 40,
        fontfamily: "'Luckiest Guy', cursive",
        fontSize: "22px",
        color: lightColor,
        margin: "auto",
        textAlign: "center",
    } as React.CSSProperties,
};

export function CharacterFile({ character }: {
    character: CharacterFileParams
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { publicRole, name, picture, summary, secret, history, personalGoal, comment, links } = character;
    return (
        <div
            style={{
                backgroundColor: "#1b1a1e",
            }}>
            <div style={{ ...styles.cardContainer, width: isMobile ? "100%" : "210mm" }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row', // Column for mobile, row for desktop
                        justifyContent: 'stretch',
                        alignItems: 'center',
                    }}
                >
                    <Box>
                        <Box sx={{
                            backgroundImage: "url('/background.svg')",
                            backgroundSize: "100% 100%",
                            marginRight: isMobile ? 0 : 2,
                        }}>
                            <img style={{
                                maxWidth: isMobile ? '100%' : 240,
                                boxSizing: "border-box",
                                // border: "double 10px #dfd7ce",
                                padding: 8,
                            }} src={picture} />
                        </Box>
                    </Box>
                    <Box style={{
                        backgroundImage: "url('/title.svg')",
                        backgroundSize: "auto 100%",
                        backgroundPosition: "center",
                        paddingTop: 64,
                        marginTop: isMobile ? 20 : 0,
                        paddingBottom: 36,
                        marginBottom: 36,
                        letterSpacing: "default",
                        width: "100%",
                    }}>
                        <h2 style={{
                            textAlign: "center",
                            fontSize: "2rem",
                            marginBottom: "15px",
                            paddingBottom: "10px",
                            fontFamily: "OldNewspaperTypes",
                            fontWeight: "initial",
                        }}>{name}</h2>
                        <h1 style={styles.role}>{publicRole}</h1>
                        <svg viewBox="0 0 500 100" style={styles.subTitle}>
                            <path id="curve" d="M 0,-50 Q 250,200 500,-50" fill="transparent" />
                            <text fill={lightColor}>
                                <textPath startOffset="50%" textAnchor="middle" href="#curve">
                                    Murder Party Blattes
                                </textPath>
                            </text>
                        </svg>
                    </Box>
                </Box>
                <h2 style={styles.secret}>Secret : {secret}</h2>
                <VintageSection>
                    <h3>Ton personnage</h3>
                    <p>{summary}</p>
                </VintageSection>
                <VintageSection>
                    <h3>Ton histoire</h3>
                    <p>{history}</p>
                </VintageSection>
                <VintageSection>
                    <h3>Tes objectifs</h3>
                    <p>{personalGoal}</p>
                </VintageSection>
                <div>
                    <h3>Les personnes que tu connais à la soirée</h3>
                    <Grid container direction="row" spacing={1} sx={{ marginBottom: 2 }}>
                        {links.map((link) => (
                            <Grid size={isMobile ? 12 : 6}>
                                <Card sx={{ minHeight: "100%", fontSize: "0.8rem", backgroundColor: "inherit", color: "inherit", borderColor: lightColor }}>
                                    <CardHeader title={link.anonymous ? "Anonyme" : link.name}
                                        titleTypographyProps={{ fontFamily: "OldNewspaperTypes", fontSize: "1.1rem" }} />
                                    <CardMedia sx={{
                                        backgroundImage: "url('/background.svg')",
                                        backgroundSize: "100% 100%",
                                        marginRight: 2,
                                    }}>
                                        <img style={{
                                            boxSizing: "border-box",
                                            // border: "double 10px #dfd7ce",
                                            padding: 8,
                                        }} src={link.anonymous ? "https://cdn.midjourney.com/adf374a6-e542-458c-8674-0c65fb8814d9/0_0.png" : link.picture} width="100%" />
                                    </CardMedia>
                                    <CardContent><p>{link.description}</p></CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <VintageSection>
                    <h3>Quelques mots du Maître du jeu</h3>
                    <p>Il est probable que des évènements viennent chambouler la soirée ! C'est une Murder Party après tout !</p>
                    <p>
                        Si tu es accusé, défends-toi en t'appuyant sur les informations et secrets que tu connais pour prouver ton innocence ou attiser la suspcition sur un autre joueur.
                        <br />Si tu soupçonnes quelqu'un, n'hésites pas à en discuter avec les autres invités. Selon l'opinion générale, la foule pourra le confronter publiquement.
                        <br />Tes priorités sont les suivantes :
                    </p>
                    <ul>
                        <li>Éviter d'être accusé à tort</li>
                        <li>Atteindre vos objectifs personnels</li>
                        <li>Aider à démasquer le coupable si cela est dans ton intérêt :)</li>
                    </ul>
                    <br />
                    <p>{comment}</p>
                </VintageSection>
            </div></div>
    );
}