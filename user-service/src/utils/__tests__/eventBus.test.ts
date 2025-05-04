import 'reflect-metadata';
import { EventBus, EventTypes, PaymentSuccessEvent } from '../eventBus';

describe('EventBus', () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  describe('publish and subscribe', () => {
    it('should publish and receive events', () => {
      const mockListener = jest.fn();
      const eventData: PaymentSuccessEvent = {
        userId: 'user123',
        subscriptionId: 'sub123',
        planId: 'plan123',
        timestamp: '2024-01-01T00:00:00Z',
      };

      eventBus.subscribe(EventTypes.PAYMENT_SUCCESS, mockListener);
      eventBus.publish(EventTypes.PAYMENT_SUCCESS, eventData);

      expect(mockListener).toHaveBeenCalledWith(eventData);
    });

    it('should handle multiple subscribers', () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      const eventData = { test: 'data' };

      eventBus.subscribe(EventTypes.PAYMENT_SUCCESS, mockListener1);
      eventBus.subscribe(EventTypes.PAYMENT_SUCCESS, mockListener2);
      eventBus.publish(EventTypes.PAYMENT_SUCCESS, eventData);

      expect(mockListener1).toHaveBeenCalledWith(eventData);
      expect(mockListener2).toHaveBeenCalledWith(eventData);
    });

    it('should not call unsubscribed listeners', () => {
      const mockListener = jest.fn();
      const eventData = { test: 'data' };

      eventBus.subscribe(EventTypes.PAYMENT_SUCCESS, mockListener);
      eventBus.unsubscribe(EventTypes.PAYMENT_SUCCESS, mockListener);
      eventBus.publish(EventTypes.PAYMENT_SUCCESS, eventData);

      expect(mockListener).not.toHaveBeenCalled();
    });
  });

  describe('event isolation', () => {
    it('should not trigger listeners for different event types', () => {
      const paymentListener = jest.fn();
      const cancelListener = jest.fn();
      const paymentData = { userId: 'user123', subscriptionId: 'sub123' };

      eventBus.subscribe(EventTypes.PAYMENT_SUCCESS, paymentListener);
      eventBus.subscribe(EventTypes.SUBSCRIPTION_CANCELED, cancelListener);
      
      eventBus.publish(EventTypes.PAYMENT_SUCCESS, paymentData);

      expect(paymentListener).toHaveBeenCalledWith(paymentData);
      expect(cancelListener).not.toHaveBeenCalled();
    });
  });
});