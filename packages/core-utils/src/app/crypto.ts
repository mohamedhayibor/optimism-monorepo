/* External Imports */
import { Md5 } from 'ts-md5'
import { ethers } from 'ethers'

/* Internal Imports */
import { HashAlgorithm, HashFunction } from '../types'
import { add0x, remove0x } from './misc'

/**
 * Creates an Md5 hash of the provided input
 *
 * @param preimage the Buffer to hash
 * @returns the hash as a Buffer
 */
export const Md5Hash = (preimage: string): string => {
  return Md5.hashStr(preimage).toString()
}

/**
 * Computes the keccak256 hash of a value.
 * Note: assumes the value is a valid hex string.
 *
 * @param value Value to hash
 * @returns the hash of the value.
 */
export const keccak256 = (value: string): string => {
  const preimage = add0x(value)
  return remove0x(ethers.utils.keccak256(preimage))
}

/**
 * Computes the keccak256 hash of the value represented by the provided UTF-8 string.
 *
 * @param s The UTF-8 encoded string.
 * @returns The keccak256 hash.
 */
export const keccak256FromUtf8 = (s: string): string => {
  return add0x(keccak256(Buffer.from(s).toString('hex')))
}

/**
 * Gets the hash function for the provided HashAlgorithm.
 *
 * @param algo The HashAlgorithm in question
 * @returns The hash function, if one exists
 */
export const hashFunctionFor = (algo: HashAlgorithm): HashFunction => {
  switch (algo) {
    case HashAlgorithm.MD5:
      return Md5Hash
    case HashAlgorithm.KECCAK256:
      return keccak256
    default:
      throw Error(`HashAlgorithm ${algo} not supported.`)
  }
}
