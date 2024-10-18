import { Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../schemas/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private logger: Logger,
  ) { }
  async signUp(email: string, name: string, password: string): Promise<User> {
    this.logger.log(`SignUp method service call with Input. : Email ${email}`);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      email,
      name,
      password: hashedPassword,
    });

    const result = await newUser.save();
    this.logger.log(`User SignUp Successfully. : Data ${result}`);
    return result;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      this.logger.log(`User details Validate Successfully. : Email ${email}`);
      return user;

    }
    this.logger.error(`Fail to Validate the User details. : Email ${email}`);
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.name };
    this.logger.log(`User SignIn Successfully. : user ${user}`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validate(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      this.logger.log(`User Validate Successfully. : Email ${email}`);
      return user;
    }
    this.logger.error(`Fail to Validate the User. : Email ${email}`);
    return null;
  }
}
