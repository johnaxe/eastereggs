import {
    Container,
    Divider,
    Box,
    Button,
    Snackbar,
    Collapse,
    Alert,
    Paper,
    Typography,
    TextField,
    IconButton,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Image from "next/image";
import { setCookie, parseCookies } from "nookies";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import MathMatrix from "@/components/MathMatrix";
const imgs = [...Array(6).keys()].map((a, i) => {
    return (
        <Image
            key={`img_${i}`}
            alt="easter"
            src="/icon-512x512.png"
            width={80}
            height={80}
        />
    );
});

const codes = {
    2: "2222",
    3: "3333",
    4: "4444",
    5: "5555",
    7: "7777",
    8: "8888",
    9: "9999",
};

const descriptions = {
    1: "Pusslet måste lösas innan du kan gå vidare",
    2: "Du hittar koden i ägget som ligger i den där som finns i den där som ligger i andra",
    3: "Du hittar koden i ägget som ligger i bla 3",
    4: "Du hittar koden i ägget som ligger i bla 4. Glöm inte att kika runt noga nu!",
    5: "Du hittar koden i ägget som ligger i bla 5",
    7: "Du hittar koden i ägget som ligger i bla 7",
    8: "Du hittar koden i ägget som ligger i bla 8",
    9: "Du hittar koden i ägget som ligger i bla 9",
};

const Home = () => {
    const [progress, setProgress] = useState(0);
    const [snackStatus, setSnackStatus] = useState({
        status: "success",
        show: false,
        message: "",
    });
    const [status, setStatus] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
    });
    const [timeLeft, setTimeLeft] = useState(2);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const cookies = parseCookies();
        if (cookies.PROGRESS) {
            setProgress(parseInt(cookies.PROGRESS));
        }
        const myfunc = setInterval(function () {
            const now = new Date().getTime();
            let timeleft = countDownDate - now;

            // Calculating the days, hours, minutes and seconds left
            const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (timeleft % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            setTimeLeft(timeleft);
            if (timeleft < 0) {
                clearInterval(myfunc);
                setTimeLeft(0);
            } else {
                setCountdown({
                    days: days,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds,
                });
            }
        }, 1000);
    }, []);

    const countDownDate = new Date("Apr 6, 2023 17:00:00").getTime();

    const resetProgress = () => {
        setProgress(0);
        setCookie(null, "PROGRESS", 0, {
            maxAge: 24 * 60 * 60,
            sameSite: "none",
            secure: true,
            path: "/",
        });
        setStatus({
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
        });
    };

    const setNext = () => {
        const next = parseInt(progress + 1);
        setProgress(next);
        setInputValue("");
        setCookie(null, "PROGRESS", next, {
            maxAge: 24 * 60 * 60,
            sameSite: "none",
            secure: true,
            path: "/",
        });
    };

    const validateProgress = (state) => {
        const txt =
            state == "success"
                ? "Bra jobbat!"
                : "Ej korrekt! Kontrollera ditt svar";
        if (state == "success") {
            let statusCopy = { ...status };
            statusCopy[progress] = true;
            setStatus(statusCopy);
        }
        setSnackStatus({ status: state, show: true, message: txt });
    };

    const checkCode = (e) => {
        setInputValue(e.target.value);
        if (e.target.value == codes[progress]) {
            setStatus({ ...status, [progress]: true });
        }
    };

    console.log(progress);
    return (
        <>
            {timeLeft == 0 && (
                <Button
                    sx={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        width: "auto",
                        m: 0,
                    }}
                    onClick={() => {
                        resetProgress();
                    }}>
                    <RestartAltIcon />
                </Button>
            )}
            <Snackbar
                sx={{ width: "100%" }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackStatus.show}
                autoHideDuration={6000}
                onClose={() => {
                    setSnackStatus({
                        status: "success",
                        show: false,
                        message: "",
                    });
                }}>
                <Alert severity={snackStatus.status}>
                    {snackStatus.message}
                </Alert>
            </Snackbar>
            {progress == 11 && <Confetti recycle={true} />}
            <Container>
                <Paper
                    elevation={2}
                    sx={{ p: 4, minWidth: 320, maxWidth: 480 }}>
                    {progress == 11 && (
                        <>
                            <Typography
                                variant="h1"
                                className="text-center"
                                sx={{ color: "darkgreen" }}>
                                GRATTIS!!
                            </Typography>
                            <Typography
                                variant="body1"
                                className="text-center"
                                sx={{ color: "darkgreen" }}>
                                Du har klarat jakten! Du hittar en belöning i...
                            </Typography>
                            <Typography
                                variant="h3"
                                className="text-center"
                                sx={{ color: "blue" }}>
                                STÄLLET SOM SKATTEN FINNS PÅ
                            </Typography>
                        </>
                    )}
                    {progress == 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 2,
                            }}>
                            {imgs}
                        </Box>
                    )}
                    {progress == 0 && (
                        <Typography variant="h4" className="text-center">
                            Påskjakten 2023
                        </Typography>
                    )}
                    {progress == 10 && (
                        <>
                            <Typography variant="h4" className="text-center">
                                #{progress} Lös mattetalen!!
                            </Typography>
                            <Alert
                                sx={{ width: "100%", my: 2 }}
                                severity={
                                    status[progress] ? "success" : "warning"
                                }>
                                <Typography
                                    variant="body1"
                                    className="text-center">
                                    Status:{" "}
                                    {status[progress]
                                        ? "Avklarad!!"
                                        : "Ej avklarad"}
                                </Typography>
                            </Alert>
                            <MathMatrix validateProgress={validateProgress} />
                        </>
                    )}
                    {progress == 1 && (
                        <>
                            <Typography variant="h4" className="text-center">
                                #{progress} Lös pusslet!!
                            </Typography>
                            <Alert
                                sx={{ width: "100%", my: 2 }}
                                severity={
                                    status[progress] ? "success" : "warning"
                                }>
                                <Typography
                                    variant="body1"
                                    className="text-center">
                                    Status:{" "}
                                    {status[progress]
                                        ? "Avklarad!!"
                                        : "Ej avklarad"}
                                </Typography>
                            </Alert>
                            <JigsawPuzzle
                                imageSrc="/IMG_1738.png"
                                rows={3}
                                columns={3}
                                onSolved={() => {
                                    validateProgress("success");
                                }}
                            />
                        </>
                    )}
                    {progress == 6 && (
                        <>
                            <Typography variant="h4" className="text-center">
                                #{progress} Lös pusslet!!
                            </Typography>
                            <Alert
                                sx={{ width: "100%", my: 2 }}
                                severity={
                                    status[progress] ? "success" : "warning"
                                }>
                                <Typography
                                    variant="body1"
                                    className="text-center">
                                    Status:{" "}
                                    {status[progress]
                                        ? "Avklarad!!"
                                        : "Ej avklarad"}
                                </Typography>
                            </Alert>
                            <JigsawPuzzle
                                imageSrc="/IMG_0426.png"
                                rows={4}
                                columns={4}
                                onSolved={() => {
                                    validateProgress("success");
                                }}
                            />
                        </>
                    )}
                    {((progress >= 2 && progress < 6) ||
                        (progress >= 7 && progress < 10)) && (
                        <>
                            <Typography variant="h4" className="text-center">
                                #{progress} Skriv in koden!
                            </Typography>
                            <Typography variant="body1" className="text-center">
                                {descriptions[progress]}
                            </Typography>
                            <Alert
                                sx={{ width: "100%", my: 2 }}
                                severity={
                                    status[progress] ? "success" : "warning"
                                }>
                                <Typography
                                    variant="body1"
                                    className="text-center">
                                    Status:{" "}
                                    {status[progress]
                                        ? "Avklarad!!"
                                        : "Ej avklarad"}
                                </Typography>
                            </Alert>
                            <TextField
                                sx={{ width: "100%" }}
                                value={inputValue}
                                onChange={checkCode}
                                variant="filled"
                                label="Skriv koden här"
                                placeholder="#kod?"
                                autoComplete="off"
                                InputProps={{
                                    sx: {
                                        "& input": {
                                            py: 3,
                                            fontSize: "24px",
                                            textAlign: "center",
                                        },
                                    },
                                }}
                                error={status[progress] ? false : true}
                                disabled={status[progress] ? true : false}
                            />
                        </>
                    )}
                    {timeLeft == 0 ? (
                        <Button
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{
                                display:
                                    progress > 0 && !status[progress]
                                        ? "none"
                                        : "flex",
                            }}
                            onClick={() => {
                                setNext();
                            }}>
                            {progress == 0 ? "Starta" : "Nästa"}
                            <NavigateNextIcon />
                        </Button>
                    ) : (
                        <Box>
                            <Typography variant="body1" className="text-center">
                                Börjar om:
                            </Typography>
                            <Box className="row-center" sx={{ gap: 1 }}>
                                {timeLeft > 60 * 60 * 24 * 1000 && (
                                    <Typography variant="body1">
                                        {countdown.days} dag
                                    </Typography>
                                )}
                                {timeLeft > 60 * 60 * 1000 && (
                                    <Typography variant="body1">
                                        {countdown.hours} tim
                                    </Typography>
                                )}
                                {timeLeft > 60 * 1000 && (
                                    <Typography variant="body1">
                                        {countdown.minutes} min
                                    </Typography>
                                )}
                                <Typography variant="body1">
                                    {countdown.seconds} sek
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Paper>
            </Container>
        </>
    );
};

export default Home;
