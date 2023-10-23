/* eslint-disable prettier/prettier */
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  enableShutDownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await this.$disconnect();
    });

    app.close().then(() => this.$disconnect());
  }
}
