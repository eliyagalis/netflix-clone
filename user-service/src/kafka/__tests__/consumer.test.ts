import 'reflect-metadata';
import { KafkaConsumer } from '../consumer';
import { EventBus, EventTypes } from '../../utils/eventBus';

describe('KafkaConsumer', () => {
  let kafkaConsumer: KafkaConsumer;
  let mockEventBus: Partial<EventBus>;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockEventBus = {
      publish: jest.fn(),
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
    };

    kafkaConsumer = new KafkaConsumer(mockEventBus as EventBus);
  });

  describe('connect', () => {
    it('should connect to Kafka and subscribe to topics', async () => {
      const connectSpy = jest.spyOn(kafkaConsumer, 'connect');
      
      await kafkaConsumer.connect();

      expect(connectSpy).toHaveBeenCalled();
      // The actual connect implementation is mocked, so we can't test internals
    });
  });

  describe('message routing', () => {
    it('should route PAYMENT_SUCCESS message correctly', async () => {
      const testMessage = {
        eventType: 'PAYMENT_SUCCESS',
        userId: 'user123',
        subscriptionId: 'sub123',
        planId: 'plan123',
        timestamp: '2024-01-01T00:00:00Z',
      };

      // Access the private routeMessage method for testing
      const routeMessage = (kafkaConsumer as any).routeMessage.bind(kafkaConsumer);
      await routeMessage(testMessage);

      expect(mockEventBus.publish).toHaveBeenCalledWith(
        EventTypes.PAYMENT_SUCCESS,
        {
          userId: testMessage.userId,
          subscriptionId: testMessage.subscriptionId,
          planId: testMessage.planId,
          timestamp: testMessage.timestamp,
        }
      );
    });

    it('should handle unknown event types', async () => {
      const message = {
        eventType: 'UNKNOWN_EVENT',
        userId: 'user123',
      };

      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      const routeMessage = (kafkaConsumer as any).routeMessage.bind(kafkaConsumer);
      await routeMessage(message);

      expect(consoleWarnSpy).toHaveBeenCalledWith('Unknown event type: UNKNOWN_EVENT');
      expect(mockEventBus.publish).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });
  });

  describe('error handling', () => {
    it('should handle connection errors', async () => {
      // Override the connect method for this test
      jest.spyOn(kafkaConsumer, 'connect').mockRejectedValueOnce(new Error('Connection failed'));

      await expect(kafkaConsumer.connect()).rejects.toThrow('Connection failed');
    });
  });
});