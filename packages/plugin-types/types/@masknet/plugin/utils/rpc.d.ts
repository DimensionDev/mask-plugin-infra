
declare module '@masknet/plugin/utils/rpc' {
    import type { RPCType, GeneratorRPC } from 'mask:self'
    import type { AsyncVersionOf, AsyncGeneratorVersionOf } from 'async-call-rpc/full'

    export const worker: AsyncVersionOf<RPCType>
    export const workerGenerator: AsyncGeneratorVersionOf<GeneratorRPC>

}
