declare module '@mask-net/base/identifier.js' {
    import type { Option } from 'ts-results'
    export abstract class Identifier {
        abstract toText(): string
        abstract [Symbol.toStringTag]: string
        static from(input: string | undefined | null): Option<Identifier>
        static [Symbol.hasInstance](x: unknown): boolean
    }
    /**
     * This class identify the point on an EC curve.
     * ec_key:secp256k1/CompressedPoint
     */
    export class ECKeyIdentifier extends Identifier {
        static from(input: string | null | undefined): Option<ECKeyIdentifier>
        static fromHexPublicKeyK256(hex: string | null | undefined): Option<ECKeyIdentifier>
        readonly curve: 'secp256k1'
        readonly rawPublicKey: string
        constructor(curve: 'secp256k1', publicKey: string)
        toText(): string
        get publicKeyAsHex(): string
        [Symbol.toStringTag]: string
        static [Symbol.hasInstance](x: any): boolean
    }
    export type PersonaIdentifier = ECKeyIdentifier
    export const PersonaIdentifier: typeof ECKeyIdentifier[]
    export class PostIVIdentifier extends Identifier {
        static from(input: string | null | undefined): Option<PostIVIdentifier>
        readonly network: string
        readonly postIV: string
        constructor(network: string, postIV: string)
        toText(): string
        toIV(): Uint8Array
        [Symbol.toStringTag]: string
        static [Symbol.hasInstance](x: any): boolean
    }
    /**
     * If identifier is a PostIdentifier, that means this post is bound with other post in some kind
     * e.g. a comment.
     */
    export class PostIdentifier extends Identifier {
        static from(input: string | null | undefined): Option<PostIdentifier>
        readonly identifier: ProfileIdentifier
        readonly postID: string
        constructor(identifier: ProfileIdentifier, postID: string)
        toText(): string
        [Symbol.toStringTag]: string
        static [Symbol.hasInstance](x: any): boolean
    }
    /**
     * Refers to a profile on a network.
     */
    export class ProfileIdentifier extends Identifier {
        static from(input: string | null | undefined): Option<ProfileIdentifier>
        static of(network: string | undefined | null, userID: string | undefined | null): Option<ProfileIdentifier>
        readonly network: string
        readonly userId: string
        private constructor()
        toText(): string
        [Symbol.toStringTag]: string
        static [Symbol.hasInstance](x: any): boolean
    }
}
