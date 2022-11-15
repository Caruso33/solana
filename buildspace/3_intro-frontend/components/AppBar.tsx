import { FC } from "react"
import styles from "../styles/Home.module.css"
import Image from "next/image"
import dynamic from "next/dynamic"

export const AppBar: FC = () => {
  const WalletDisconnectButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
    { ssr: false }
  )
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  )

  return (
    <div className={styles.AppBar}>
      <Image src="/solanaLogo.png" height={30} width={200} alt="solana logo" />

      <span>Wallet-Adapter Example</span>

      <div>
        <WalletMultiButtonDynamic />
        <WalletDisconnectButtonDynamic />
      </div>
    </div>
  )
}
