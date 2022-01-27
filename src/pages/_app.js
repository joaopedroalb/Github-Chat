import { UserNameProvider } from "../Data/UsernameContext"
import GlobalStyle from "./globalstyle"

function MyApp({ Component, pageProps }) {
    return (
        <>
            <UserNameProvider>
                <GlobalStyle/>
                <Component {...pageProps} />
            </UserNameProvider>
        </>
    )
}

export default MyApp
