import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../user.entity';
import { RegisterUserDto, UpdateUserDto } from '../requests';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(registerUserDto: RegisterUserDto) {
    const { identifier, password } = registerUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User();
    user.identifier = identifier;
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }

  getUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async getUserByIdentifier(identifier: string): Promise<User> {
    return this.userRepository.findOne({
      where: { identifier: identifier },
    });
  }

  getUsers() {
    return this.userRepository.find();
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    console.info('update >>>', updateUserDto);
  }
}
