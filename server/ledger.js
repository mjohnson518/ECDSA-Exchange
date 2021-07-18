class Account {
    constructor(_pubkey, _balance) {
        this.pubkey = _pubkey;
        this.balance = _balance;
    }
}

class Ledger {
    constructor(_accounts = {}) {
        this.accounts = _accounts;
    }

    // would need to avoid pubkeys collisions...
    addAccount(pubkey, balance = 0) {
        this.accounts[pubkey] = new Account(pubkey, balance);
    }
}

module.exports = Ledger;
