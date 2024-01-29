import { access, readFile, writeFile } from 'fs/promises';
import { parse, stringify } from 'yaml';
import { Auditor } from 'audit-var';
import { resolve } from 'path';

export class Config {
    static async exists(path: string): Promise<boolean> {
        try {
            await access(resolve(path));
            return true;
        } catch {
            return false;
        }
    }

    static async create(
        path: string,
        data: { [K in keyof Config]: Config[K]; }
    ): Promise<void>{
        return writeFile(
            resolve(path),
            stringify(data),
            'utf-8'
        );
    }

    static async load(path: string): Promise<Config> {
        const auditor = new Auditor({
            type: 'object',
            keys: {
                host: { type: 'string', min: 1 },
                port: { type: 'number', min: 0, max: 99999 },
                user: { type: 'string', min: 1 },
                pass: { type: 'string', min: 1 }
            }
        });

        try {
            path = resolve(path);
            const text = await readFile(path, 'utf-8');
            const data = auditor.audit(parse(text));
            
            const resp = new Config();
            resp.#host = data.host;
            resp.#port = data.port;
            resp.#user = data.user;
            resp.#pass = data.pass;
            return resp;
        } catch (err: any) {
            throw new Error(`Cannot parse "${path}"`);
        }
    }

    #host!: string;
    get host(): string {
        return this.#host;
    }
    set host(v: string) {
        this.#host = v;
    }
    
    #port!: number;
    get port(): number {
        return this.#port;
    }
    set port(v: number) {
        this.#port = v;
    }
    
    #user!: string;
    get user(): string {
        return this.#user;
    }
    set user(v: string) {
        this.#user = v;
    }
    
    #pass!: string;
    get pass(): string {
        return this.#pass;
    }
    set pass(v: string) {
        this.#pass = v;
    }
}