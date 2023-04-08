const mathMatrix = [
    { index: 0, answer: 22, x: "3 * 9 - 5" },
    { index: 1, answer: 47, x: "2 + 9 * 5" },
    { index: 2, answer: 121, x: "11 * 11" },
    { index: 3, answer: 4, x: "(3 - 1) * (7 - 5)" },
    { index: 4, answer: 28, x: "2 * (13 + 1)" },
    { index: 5, answer: 45, x: "5 * 9" },
    { index: 6, answer: 40, x: "43 - 12 + 9" },
    { index: 7, answer: 20, x: "(2 + 2) * (3 + 2)" },
    { index: 8, answer: 94, x: "121 - 27" },
    { index: 9, answer: 144, x: "12 * 12" },
];
import { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
const MathMatrix = ({ validateProgress, status }) => {
    const [mathInputs, setMathInputs] = useState({
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
    });

    const handleMathInput = (val, i) => {
        setMathInputs({ ...mathInputs, [i]: val });
    };

    const checkAnswers = () => {
        let hasErrors = false;
        mathMatrix.forEach((m, i) => {
            if (mathInputs[m.index] != m.answer) {
                hasErrors = true;
            }
        });
        if (hasErrors) {
            validateProgress("error");
        } else {
            validateProgress("success");
        }
    };

    return (
        <>
            {mathMatrix.map((m, i) => (
                <Grid key={`gr_${i}`} container spacing={0}>
                    <Grid item xs={8} className="row-center">
                        <Typography variant="body1">{m.x} =</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            disabled={status}
                            type="tel"
                            onChange={(e) => {
                                handleMathInput(e.target.value, i);
                            }}
                            value={mathInputs[i]}
                            autoComplete="off"
                            InputProps={{
                                sx: {
                                    "& input": {
                                        py: 1,
                                        fontSize: "20px",
                                        textAlign: "center",
                                    },
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            ))}
            <Button
                sx={{ display: status ? "none" : "flex" }}
                onClick={() => {
                    checkAnswers();
                }}>
                Kontrollera svaren
            </Button>
        </>
    );
};

export default MathMatrix;
