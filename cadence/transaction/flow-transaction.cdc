import FlowToken from 0x9a0766d93b6608b7

// Assume you have the addresses of the sender and recipient
let senderAddress = 0xad537ac6daff46c1
let recipientAddress = 0x0311f7cb910e8830

// Function to deposit tokens from sender to recipient
pub fun depositTokens(sender: Address, recipient: Address) {
    // Create a connection to the FlowToken contract
    let flowToken = getAccount(0x9a0766d93b6608b7).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
        .borrow()
        ?? panic("Could not borrow capability from FlowToken contract")

    // Create a sender's vault
    let senderVault = flowToken.withdraw(sender)

    // Deposit tokens from sender's vault to recipient's vault
    senderVault.deposit(recipient)

    log("Tokens deposited successfully")
}
