// We should release those packages as real npm packages.

declare module '@masknet/typed-message' {
    /**
     * The basic structure that contains
     */
    export interface TypedMessage {
        /**
         * The metadata this message contains.
         * Not expected to display to normal users.
         *
         * It will be serialized to a JSON object.
         */
        readonly meta?: ReadonlyMap<string, unknown>
        /**
         * The type of this message.
         *
         * Custom message must starts with 'x-' (means extension).
         */
        readonly type: string
    }
}
