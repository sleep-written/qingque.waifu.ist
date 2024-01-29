import test from 'ava';
import { resolve } from 'path';

import { Config } from './config.js';
import { rm, writeFile } from 'fs/promises';

const path = resolve('./config.test.yml');
test.after(async _ => {
    await rm(path, { force: true });
});

test.serial('Load file SUCCESS', async t => {
    await writeFile(path, 
            'host: aaaa\n'
        +   'port: 21\n'
        +   'user: cccc\n'
        +   'pass: dddd\n'
    );

    const conf = await Config.load(path);
    t.is(conf.host, 'aaaa');
    t.is(conf.port, 21);
    t.is(conf.user, 'cccc');
    t.is(conf.pass, 'dddd');
});
