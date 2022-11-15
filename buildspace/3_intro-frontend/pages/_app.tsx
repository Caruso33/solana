import { NextPage } from "next"
import WalletContextProvider from "../components/WalletContextProvider"

require("../styles/globals.css")
require("../styles/Home.module.css")

const App = ({
  Component,
  pageProps,
}: {
  Component: NextPage
  pageProps: any
}) => {
  return (
    <WalletContextProvider>
      <Component {...pageProps} />
    </WalletContextProvider>
  )
}

export default App
