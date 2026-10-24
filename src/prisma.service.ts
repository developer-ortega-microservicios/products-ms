import { Injectable, Logger } from "@nestjs/common";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./generated/prisma/client.js";
import { envs } from "./config/envs.js";


@Injectable()
export class PrismaService extends PrismaClient {

    private logger = new Logger('PrismaService');

    constructor() {
        const adapter = new PrismaBetterSqlite3({ url: envs.databaseUrl })
        super({adapter})

        this.logger.log('Database Connected')
    }
}
