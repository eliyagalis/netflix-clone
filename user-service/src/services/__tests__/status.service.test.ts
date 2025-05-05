import 'reflect-metadata';
import { StatusService } from '../status.service';
import { UserStatus } from '../../interfaces/IUser';

describe('StatusService', () => {
  let statusService: StatusService;

  beforeEach(() => {
    statusService = new StatusService();
  });

  describe('isValidStatusTransition', () => {
    it('should allow valid transitions from AWAITING_PAYMENT', () => {
      expect(
        statusService.isValidStatusTransition(UserStatus.AWAITING_PAYMENT, UserStatus.ACTIVE)
      ).toBe(true);
      
      expect(
        statusService.isValidStatusTransition(UserStatus.AWAITING_PAYMENT, UserStatus.SUSPENDED)
      ).toBe(true);
    });

    it('should allow valid transitions from ACTIVE', () => {
      expect(
        statusService.isValidStatusTransition(UserStatus.ACTIVE, UserStatus.SUSPENDED)
      ).toBe(true);
    });

    it('should allow maintaining the same status', () => {
      expect(
        statusService.isValidStatusTransition(UserStatus.ACTIVE, UserStatus.ACTIVE)
      ).toBe(true);
      
      expect(
        statusService.isValidStatusTransition(UserStatus.SUSPENDED, UserStatus.SUSPENDED)
      ).toBe(true);
    });

    it('should reject invalid transitions', () => {
      expect(
        statusService.isValidStatusTransition(UserStatus.INITIAL, UserStatus.ACTIVE)
      ).toBe(false);
      
      expect(
        statusService.isValidStatusTransition(UserStatus.SUSPENDED, UserStatus.AWAITING_PAYMENT)
      ).toBe(false);
    });
  });

  describe('getStatusAfterSubscription', () => {
    it('should return ACTIVE status after subscription', () => {
      expect(statusService.getStatusAfterSubscription(UserStatus.AWAITING_PAYMENT)).toBe(UserStatus.ACTIVE);
      expect(statusService.getStatusAfterSubscription(UserStatus.INITIAL)).toBe(UserStatus.ACTIVE);
    });
  });

  describe('getSuspendedStatus', () => {
    it('should return SUSPENDED status', () => {
      expect(statusService.getSuspendedStatus()).toBe(UserStatus.SUSPENDED);
    });
  });
});