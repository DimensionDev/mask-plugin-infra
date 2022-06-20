/// <reference path="./worker.d.ts" />
/// <reference path="./content-script.d.ts" />
/// <reference path="./ui.d.ts" />

declare module '@masknet/plugin' {
    import type { RPCType, GeneratorRPC } from 'mask://self'
    import type { AsyncVersionOf, AsyncGeneratorVersionOf } from 'async-call-rpc/full'

    export const worker: AsyncVersionOf<RPCType>
    export const workerGenerator: AsyncGeneratorVersionOf<GeneratorRPC>
}
