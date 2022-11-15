import * as Web3 from "@solana/web3.js"
import dotenv from "dotenv"
import { initializeKeypair } from "./utils"
dotenv.config()

const PROGRAM_ID = new Web3.PublicKey(
  "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
)
const PROGRAM_DATA_PUBLIC_KEY = new Web3.PublicKey(
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
)

async function main() {
  const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"))
  const signer = await initializeKeypair(connection)

  console.log("Public key:", signer.publicKey.toBase58())

  await transferSol(
    connection,
    signer,
    new Web3.PublicKey("3Q3aBupySQo1274dXcZrKYLXxkSwDCJgNTf2cHLjsgBY"),
    0.01 * Web3.LAMPORTS_PER_SOL
  )
}

async function transferSol(
  connection: Web3.Connection,
  sender: Web3.Keypair,
  receiver: Web3.PublicKey,
  amount: number
) {
  const transaction = new Web3.Transaction()
  const instruction = Web3.SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiver,
    lamports: amount,
  })

  transaction.add(instruction)
  const transactionSignature = await Web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [sender]
  )

  console.log(
    `Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
  )
}

main()
  .then(() => {
    console.log("Finished successfully")
    process.exit(0)
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
