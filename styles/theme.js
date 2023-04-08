import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
const theme = createTheme({
    spacing: 8,
    shape: {
        borderRadius: 0,
    },
    palette: {
        background: {
            default: "#fff",
        },
    },
    typography: {
        body1: {
            fontSize: ".9rem",
        },
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    input: {
                        padding: "8px 0px",
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    legend: {
                        "& span": {
                            padding: "0px 1px 0px 0px;",
                        },
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: "0.7rem",
                    left: "-3px",
                    top: "3px",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    border: "1px solid var(--body-color)",
                    borderRadius: "0px",
                    backgroundColor: "var(--body-color)",
                    cursor: "pointer",
                    color: "#fff",
                    width: "100%",
                    marginTop: "20px",
                    marginBottom: "20px",
                    "&:hover": {
                        backgroundColor: "var(--body-color)",
                    },
                },
            },
        },
    },
});

export default theme;
