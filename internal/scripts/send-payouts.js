const { Connection, Keypair, PublicKey } = require("@solana/web3.js");
const {
  getOrCreateAssociatedTokenAccount,
  transfer,
} = require("@solana/spl-token");
const fs = require("fs");
const path = require("path");

const CONFIG_PATH = path.join(__dirname, "..", "payouts", "config.json");
const LEDGER_PATH = path.join(__dirname, "..", "payouts", "ledger.jsonl");

const DRY_RUN = process.argv.includes("--dry-run");

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));

  // Gate: token must be deployed
  if (!config.token_contract) {
    console.log("Token not launched yet. Set token_contract in internal/payouts/config.json.");
    process.exit(0);
  }

  if (!config.treasury_wallet) {
    console.log("No treasury wallet configured. Set treasury_wallet in internal/payouts/config.json.");
    process.exit(0);
  }

  const privateKeyEnv = process.env[config.treasury_private_key_env];
  if (!privateKeyEnv) {
    console.error(
      `Missing environment variable: ${config.treasury_private_key_env}`
    );
    process.exit(1);
  }

  // Read ledger
  const raw = fs.readFileSync(LEDGER_PATH, "utf8").trim();
  if (!raw) {
    console.log("Ledger is empty. Nothing to pay.");
    return;
  }

  const entries = raw.split("\n").map((line) => JSON.parse(line));
  const unpaid = entries.filter((e) => !e.paid && e.wallet);

  if (unpaid.length === 0) {
    console.log("No unpaid entries with wallet addresses.");
    return;
  }

  console.log(`${unpaid.length} unpaid entries found.`);

  if (DRY_RUN) {
    console.log("\n--- DRY RUN ---\n");
    let total = 0;
    for (const entry of unpaid) {
      console.log(
        `  PR #${entry.pr} | @${entry.author} | ${entry.tier} | ${entry.amount} tokens → ${entry.wallet}`
      );
      total += entry.amount;
    }
    console.log(`\n  Total: ${total} tokens to ${unpaid.length} recipients`);
    console.log("\nNo tokens were sent. Remove --dry-run to execute.");
    return;
  }

  // Connect to Solana
  const rpcUrl = config.rpc_url || "https://api.mainnet-beta.solana.com";
  const connection = new Connection(rpcUrl, "confirmed");

  const treasuryKeypair = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(privateKeyEnv))
  );

  const mintAddress = new PublicKey(config.token_contract);
  const decimals = config.token_decimals || 9;

  // Get treasury token account
  const treasuryTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    treasuryKeypair,
    mintAddress,
    treasuryKeypair.publicKey
  );

  console.log(`Treasury token account: ${treasuryTokenAccount.address}`);
  console.log(`Sending payments...\n`);

  let paid = 0;
  let failed = 0;

  for (const entry of unpaid) {
    try {
      const recipientPubkey = new PublicKey(entry.wallet);

      const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        treasuryKeypair,
        mintAddress,
        recipientPubkey
      );

      const rawAmount = entry.amount * 10 ** decimals;

      const signature = await transfer(
        connection,
        treasuryKeypair,
        treasuryTokenAccount.address,
        recipientTokenAccount.address,
        treasuryKeypair.publicKey,
        rawAmount
      );

      entry.paid = true;
      entry.tx = signature;
      paid++;

      console.log(
        `  Paid PR #${entry.pr} | @${entry.author} | ${entry.amount} tokens → ${entry.wallet} | tx: ${signature}`
      );
    } catch (err) {
      failed++;
      console.error(
        `  FAILED PR #${entry.pr} | @${entry.author} | ${err.message}`
      );
    }
  }

  // Write updated ledger
  const updatedLines = entries.map((e) => JSON.stringify(e));
  fs.writeFileSync(LEDGER_PATH, updatedLines.join("\n") + "\n");

  console.log(`\nDone. ${paid} paid, ${failed} failed.`);
}

main().catch((err) => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
