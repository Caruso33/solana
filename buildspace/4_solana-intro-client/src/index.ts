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

  await pingProgram(connection, signer)
}

async function pingProgram(connection: Web3.Connection, payer: Web3.Keypair) {
  const transaction = new Web3.Transaction()
  const instruction = new Web3.TransactionInstruction({
    // Instructions need 3 things

    // 1. The public keys of all the accounts the instruction will read/write
    keys: [
      {
        pubkey: PROGRAM_DATA_PUBLIC_KEY,
        isSigner: false,
        isWritable: true,
      },
    ],

    // 2. The ID of the program this instruction will be sent to
    programId: PROGRAM_ID,

    // 3. Data - in this case, there's none!
  })

  transaction.add(instruction)
  const transactionSignature = await Web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer]
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
