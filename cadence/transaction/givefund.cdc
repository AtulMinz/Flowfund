import Payfund

transaction(deposit: String) {
    prepare (signer: AuthAccount) {

    }

    execute {
        Payfund.payflow(flowToPay: deposit)
    }
}