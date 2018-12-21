const BN = require('bn.js');

var currency = function(balances = {}, initFee = '0'){

    var txHandler = function(state, incomingTx, chainInfo, type) {

        var findBalance = function(address, state) {
            if(typeof state.balances[address] === 'undefined'){
                return new BN('0')
            } else{
                return new BN(state.balances[address])
            }
        }

        var transfer = function(tx, state, fee) {
            fee = new BN(fee)
            var value = new BN(tx.value)
            var sender = tx.from
            var senderBalance = findBalance(sender, state)
            var recipient = tx.to
            var recipientBalance = findBalance(recipient, state)
            state.balances[sender] = senderBalance.sub(value).toString()
            if(typeof state.balances[recipient] === 'undefined') {
                state.balances[recipient] = value.sub(fee).toString()
            } else {
                state.balances[recipient] = recipientBalance.add(value.sub(fee)).toString()
            }
        }
        
        var validTransfer = function(balance, value, fee) {
            fee = new BN(fee)
            value = new BN(value)
            balance = new BN(balance)
            if(value.isNeg() || fee.isNeg()){
                return false
            }
            if(fee.gt(value)){
                return false
            }
        
            if(value.gt(balance)){
                return false
            }
            return true
        }

        if(incomingTx.value === '0') {
            return // short cut
        }
        var balance = findBalance(incomingTx.from, state)
        if(validTransfer(balance.toString(), incomingTx.value, state.fee)) {
            try {
                transfer(incomingTx, state, state.fee)
            } catch(e) {
                throw new Error('Transfer error:', e)
            }
        }else{
            throw new Error('Invalid transfer')
        }
    }
    
    var initialize = function(state) {
        state.balances = balances
        state.fee = initFee
    }

    var getBalance = function(state, address) {
        if(typeof state.balances[address] === 'undefined') {
            return '0'
        }else{
            return state.balances[address]
        }
    }

    return [
        {
            type:'tx',
            middleware: txHandler
        },
        {
            type:'initializer',
            middleware: initialize
        },
        {
            type:'query',
            middleware: getBalance,
            path:'getBalance'
        }
    ]
}

module.exports = currency;
