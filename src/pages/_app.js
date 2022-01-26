import GlobalStyle from "./globalstyle"

function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle/>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
