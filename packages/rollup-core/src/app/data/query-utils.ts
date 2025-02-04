/* External Imports */
import { Block, TransactionResponse } from 'ethers/providers'

/* Internal Imports */
import { RollupTransaction, TransactionAndRoot } from '../../types'

export const txInsertStatement = `INSERT INTO l1_tx(block_number, block_hash, hash, from_address, to_address, nonce, gas_limit, gas_price, calldata, v, r, s) `
export const getTransactionInsertValue = (tx: TransactionResponse): string => {
  return `${tx.blockNumber}, '${tx.blockHash}', '${tx.hash}', '${tx.from}', '${
    tx.to
  }', ${tx.nonce}, ${bigNumOrNull(tx.gasLimit)}, ${bigNumOrNull(
    tx.gasPrice
  )}, '${tx.data}', ${numOrNull(tx.v)}, ${numOrNull(tx.r)}, ${numOrNull(tx.s)}`
}

export const blockInsertStatement = `INSERT INTO l1_block(block_hash, parent_hash, block_number, block_timestamp, gas_limit, gas_used, processed) `
export const getBlockInsertValue = (
  block: Block,
  processed: boolean
): string => {
  return `'${block.hash}', '${block.parentHash}', ${
    block.number
  }, ${bigNumOrNull(block.gasLimit)}, ${bigNumOrNull(block.gasUsed)}, ${bool(
    processed
  )}`
}

export const rollupTxInsertStatement = `INSERT INTO rollup_tx(sender, l1_message_sender, target, calldata, queue_origin, nonce, gas_limit, signature, batch_number, batch_index) `
export const getRollupTransactionInsertValue = (
  tx: RollupTransaction,
  batchNumber: number
): string => {
  return `${stringOrNull(tx.sender)}, ${stringOrNull(tx.l1MessageSender)}, '${
    tx.target
  }', '${tx.calldata}', ${tx.queueOrigin}, ${numOrNull(tx.nonce)}, ${numOrNull(
    tx.gasLimit
  )}, ${stringOrNull(tx.signature)}, ${batchNumber}, ${tx.batchIndex}`
}

export const rollupStateRootInsertStatement = `INSERT into l1_state_root(state_root, batch_number, batch_index) `
export const getRollupStateRootInsertValue = (
  stateRoot: string,
  batchNumber: number,
  batchIndex: number
): string => {
  return `'${stateRoot}', ${batchNumber}, ${batchIndex}`
}

export const l2TransactionInsertStatement = `INSERT INTO l2_tx(block_number, block_timestamp, tx_index, tx_hash, sender, l1_message_sender, target, calldata, nonce, signature) `
export const getL2TransactionInsertValue = (tx: TransactionAndRoot): string => {
  return `'${tx.blockNumber}', ${tx.timestamp}, ${tx.transactionIndex}, '${
    tx.transactionHash
  }' ${stringOrNull(tx.from)}, ${stringOrNull(tx.l1MessageSender)}, '${
    tx.to
  }', '${tx.calldata}', ${tx.nonce}, ${stringOrNull(tx.signature)}`
}

export const bigNumOrNull = (bn: any): string => {
  return !!bn ? `'${bn.toString()}'` : 'NULL'
}

export const numOrNull = (num: any): any => {
  return typeof num === 'number' ? num : 'NULL'
}

export const bool = (b: boolean): string => {
  return b ? 'TRUE' : 'FALSE'
}

export const stringOrNull = (s: string): string => {
  return !!s ? `'${s}'` : 'NULL'
}
