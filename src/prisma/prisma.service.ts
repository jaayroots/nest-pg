import { Injectable, INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Connect database เมื่อแอปเริ่มทำงาน
  async onModuleInit() {
    await this.$connect();
  }

  // ปิด database connection เมื่อแอปจะปิด
  enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
