import { UserStatus } from "./IUser";

export default interface IStatusService {
  /**
   * Verifies if a status transition is valid
   * @param currentStatus The current user status
   * @param targetStatus The desired target status
   * @returns Boolean indicating if the transition is allowed
   */
  isValidStatusTransition(currentStatus: UserStatus, targetStatus: UserStatus): boolean;

  /**
   * Get the next status after a successful subscription setup
   * @param currentStatus The current user status
   * @returns The next appropriate status
   */
  getStatusAfterSubscription(currentStatus: UserStatus): UserStatus;

  /**
   * Get the status when a user account is suspended
   * @returns The suspended status
   */
  getSuspendedStatus(): UserStatus;
}