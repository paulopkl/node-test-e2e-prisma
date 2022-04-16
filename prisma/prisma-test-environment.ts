import type { Config } from "@jest/types";
import { exec } from "node:child_process";
import dotenv from "dotenv";
import NodeEnvironment from "jest-environment-node";
import { Client } from "pg";
import util from "node:util";
import crypto from "node:crypto";
import path from "node:path";

dotenv.config({ path: ".env.testing" });

const execSync = util.promisify(exec);

const prismaBinary = path.resolve(__dirname, "..",  "node_modules", ".bin", "prisma");

export default class PrismaTestEnvironment extends NodeEnvironment {
    private schema: string;
    private connectionString: string;

    constructor(config: Config.ProjectConfig) {
        super(config);

        const dbUser = process.env.DATABASE_USER;
        const dbPass = process.env.DATABASE_PASS;
        const dbHost = process.env.DATABASE_HOST;
        const dbPort = process.env.DATABASE_PORT;
        const dbName = process.env.DATABASE_NAME;

        this.schema = `test_${crypto.randomUUID()}`;
        this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`;
    }

    async setup() { // Runs before each test suite
        process.env.DATABASE_URL = this.connectionString;
        this.global.process.env.DATABASE_URL = this.connectionString;

        await execSync(`${prismaBinary} migrate deploy`); // "npx prisma migrate deploy" | "prisma migrate deploy"

        return super.setup();
    }

    async teardown() { // Runs after each test suite
        const client = new Client({
            connectionString: this.connectionString,
        });

        await client.connect();
        await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
        await client.end();
    }
}
