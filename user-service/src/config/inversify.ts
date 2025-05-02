import { Container } from 'inversify';
import { TOKENS } from '../tokens';

// Services
import IUserService from '../interfaces/IUserService';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';

// Controllers
import { UserController } from '../controllers/user.controller';

// Repositories
import IUserRepository from '../interfaces/IUserRepository';

// Adapters
import IUserAdapter from '../interfaces/IUserAdapter';
import UserAdapter from '../adapters/user-mongo.adapter';

// Middlewares
import UserBuilder from '../builders/user.builder';
import { UserRepositoryFactory } from '../factories/repostory-factory';
import IAuthService from '../interfaces/IAuthService';
import ITokenService from '../interfaces/ITokenService';
import IStatusService from '../interfaces/IStatusService';
import { StatusService } from '../services/status.service';
import { EventBus } from '../utils/eventBus';
import { KafkaConsumer } from '../kafka/consumer';

// Initialize container
const container = new Container();

// Register dependencies
container.bind<IUserAdapter>(TOKENS.IUserAdapter).to(UserAdapter);
container.bind<IStatusService>(TOKENS.IStatusService).to(StatusService);

// Adapters
const userRepository: IUserRepository = 
    UserRepositoryFactory.createRepository(
        process.env.DB_TYPE!, 
        container.get<IUserAdapter>(TOKENS.IUserAdapter),
        container.get<IStatusService>(TOKENS.IStatusService)
    );
// Repositories
container.bind<IUserRepository>(TOKENS.IUserRepository).toConstantValue(userRepository);

// Services
container.bind<IAuthService>(TOKENS.IAuthService).to(AuthService);
container.bind<IUserService>(TOKENS.IUserService).to(UserService);
container.bind<ITokenService>(TOKENS.ITokenService).to(TokenService);

// Controllers
container.bind<UserController>(TOKENS.UserController).to(UserController);

// Middlewares

//Builders
container.bind<UserBuilder>(TOKENS.IUserBuilder).to(UserBuilder);

// Event bus (singleton to ensure all subscribers receive the same events)
container.bind<EventBus>(TOKENS.EventBus).to(EventBus).inSingletonScope();

// Kafka consumer (singleton)
container.bind<KafkaConsumer>(TOKENS.KafkaConsumer).to(KafkaConsumer).inSingletonScope();

export { container };