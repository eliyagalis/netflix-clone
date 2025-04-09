import { Container } from 'inversify';
import { TOKENS } from '../tokens';

// Services
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { JwtService } from '../services/jwt.service';

// Controllers
import { AuthController } from '../controllers/auth.controller';
import { UserController } from '../controllers/user.controller';

// Repositories
import IUserRepository from '../interfaces/IUserRepository';
import { UserMongoRepository } from '../repositories/user-mongo.repository';

// Adapters
import IUserAdapter from '../interfaces/IUserAdapter';
import { UserAdapter } from '../adapters/user.adapter';

// Middlewares
import { AuthMiddleware } from '../middlewares/auth.middleware';

// Initialize container
export const container = new Container();

// Register dependencies
export const registerDependencies = () => {
  // Adapters
  container.bind<IUserAdapter>(TOKENS.IUserAdapter).to(UserAdapter);
  
  // Repositories
  container.bind<IUserRepository>(TOKENS.IUserRepository).to(UserMongoRepository);

  // Services
  container.bind<AuthService>(TOKENS.AuthService).to(AuthService);
  container.bind<UserService>(TOKENS.IUserService).to(UserService);
  container.bind<JwtService>(TOKENS.token).to(JwtService);

  // Controllers
  container.bind<AuthController>(TOKENS.AuthController).to(AuthController);
  container.bind<UserController>(TOKENS.UserController).to(UserController);

  // Middlewares
  container.bind<AuthMiddleware>(AuthMiddleware).to(AuthMiddleware);

  return container;
};