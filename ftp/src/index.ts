import { basename, resolve } from 'path';
import { fileURLToPath } from 'url';
import { Client } from 'basic-ftp';
import npmlog from 'npmlog';

import { Config } from './config.js';

const basePath = resolve(
    fileURLToPath(import.meta.url),
    '../../..',
);

const distPath = resolve(
    basePath,
    'client/dist/client/browser'
);

const confPath = resolve(
    basePath,
    'config.yml'
);

try {
    if (!await Config.exists(confPath)) {
        npmlog.info('@qingque/ftp', `Building "${basename(confPath)}"...`);
        await Config.create(confPath, {
            host: '-- put HOST here --',
            port: 21,
            user: '-- put USER here --',
            pass: '-- put PASS here --',
        });

        npmlog.info('@qingque/ftp', `"${basename(confPath)}" generated.`);
        process.exit();
    }
    
    npmlog.info('@qingque/ftp', `Reading "${basename(confPath)}"...`);
    const conf = await Config.load(confPath);
    
    npmlog.info('@qingque/ftp', `Connecting to FTP...`);
    const client = new Client();
    await client.access({
        host: conf.host,
        user: conf.user,
        password: conf.pass,
    });

    npmlog.info('@qingque/ftp', `Uploading files...`);
    await client.ensureDir('');
    await client.clearWorkingDir();
    await client.uploadFromDir(distPath);
    
    npmlog.info('@qingque/ftp', `Done!`);
} catch (err: any) {
    npmlog.error('@qingque/ftp', err?.message ?? 'Error not specified.');
} finally {
    process.exit();
}