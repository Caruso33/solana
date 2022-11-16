import dynamic from "next/dynamic"
import Image from "next/image"
import { FC } from "react"
import styles from "../styles/Home.module.css"

export const AppBar: FC = () => {
  const WalletMultiButton = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  )

  return (
    <div className={styles.AppHeader}>
      <Image src="/solanaLogo.png" height={30} width={200} />
      <span>Movie Reviews</span>
      <WalletMultiButton />
    </div>
  )
}
