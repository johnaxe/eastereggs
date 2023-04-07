import Head from "next/head";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import useRouterStatus from "hooks/useRouterStatus";
export default function Layout({ children }) {
    const { isLoading } = useRouterStatus();
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <title>Easter egg hunt</title>
            </Head>
            {children}
            <LoadingSpinner visible={isLoading} />
            <footer></footer>
        </>
    );
}
