pub contract Payfund {
    pub var deposit: [String]

    pub fun payflow(deposits: String) {
        self.deposit.append(deposits)
    }

    init() {
        self.deposit = []
    }
}