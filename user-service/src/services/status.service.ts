// src/services/user-status.service.ts
import { injectable } from "inversify";
import { UserStatus } from "../interfaces/IUser";
import IStatusService from "../interfaces/IStatusService";

@injectable()
export class StatusService implements IStatusService {
  /**
   * Status transition rules map
   * Key: Current status
   * Value: Array of valid next statuses
   */
  private readonly validTransitions: Map<UserStatus, UserStatus[]> = new Map([
    [UserStatus.AWAITING_PAYMENT, [UserStatus.ACTIVE, UserStatus.SUSPENDED]],
    [UserStatus.ACTIVE, [UserStatus.SUSPENDED]],
    [UserStatus.SUSPENDED, [UserStatus.ACTIVE]],
  ]);

  isValidStatusTransition(currentStatus: UserStatus, targetStatus: UserStatus): boolean {
    // Always allow maintaining the same status
    if (currentStatus === targetStatus) {
      return true;
    }

    const allowedNextStatuses = this.validTransitions.get(currentStatus);
    if (!allowedNextStatuses) {
      return false;
    }

    return allowedNextStatuses.includes(targetStatus);
  }

  getStatusAfterSubscription(currentStatus: UserStatus): UserStatus {
    // Based on your repository implementation, subscription always sets to ACTIVE
    return UserStatus.ACTIVE;
  }

  getSuspendedStatus(): UserStatus {
    return UserStatus.SUSPENDED;
  }
}