import { VerificationCandidate } from '../types'

export interface VerifierDataService {
  /**
   * Fetches the next L1/L2 verification candidate ready for review.
   *
   * @returns The Verification Candidate or undefined if verification is caught up.
   */
  getVerificationCandidate(): Promise<VerificationCandidate>

  /**
   * Marks the batch with the provided number verified.
   *
   * @param batchNumber The batch number in question
   */
  verifyBatch(batchNumber): Promise<void>
}
