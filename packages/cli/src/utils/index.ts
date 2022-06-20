import type { TaskFunction, TaskFunctionCallback } from 'gulp'
import { spawn } from 'node:child_process'

export function log(message: string) {
    return function (done: TaskFunctionCallback) {
        console.log('\x1b[32m[mask-plugin-cli] \x1b[0m' + message)
        done()
    }
}

export function shell(command: TemplateStringsArray, ...rest: string[]) {
    return () => {
        const [e, ...args] = join(command, ...rest).split(' ')
        return spawn(e!, args, {
            cwd: process.cwd(),
            stdio: 'inherit',
            shell: true,
        })
    }
}

export function taskToPromise(task: TaskFunction) {
    return new Promise<void>((resolve, reject) => {
        task((err?: Error | null) => {
            if (err) reject(err)
            else resolve()
        })
    })
}

function join(command: TemplateStringsArray, ...rest: string[]) {
    let text = ''
    for (const [i, t] of command.entries()) {
        text += t
        i in rest && (text += rest[i])
    }
    return text
}
