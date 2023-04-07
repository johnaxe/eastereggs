const mathMatrix = [
    { index: 0, answer: 9, x: "1 x 9" },
    { index: 1, answer: 18, x: "2 x 9" },
    { index: 2, answer: 27, x: "3 x 9" },
    { index: 3, answer: 36, x: "4 x 9" },
    { index: 4, answer: 45, x: "5 x 9" },
];
import { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
const MathMatrix = ({ validateProgress }) => {
    const [mathInputs, setMathInputs] = useState({
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
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

    console.log(mathInputs);
    return (
        <>
            {mathMatrix.map((m, i) => (
                <Grid key={`gr_${i}`} container spacing={0}>
                    <Grid item xs={8} className="row-center">
                        <Typography variant="body1">{m.x} =</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            required={true}
                            type="number"
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
                onClick={() => {
                    checkAnswers();
                }}>
                Kontrollera svaren
            </Button>
        </>
    );
};

export default MathMatrix;
