declare module '@masknet/plugin/worker' {
    import type { DatabaseStorage } from 'mask:self'
    import type { Option, Result } from 'ts-results'
    //#region TaggedStorage
    /**
     * @typeParameter Data It should be a [tagged union](https://en.wikipedia.org/wiki/Tagged_union) with an extra `id` field
     * @example
     * import { TaggedStorage } from '@masknet/plugin/worker'
     *
     * type File = { type: 'file'; name: string; id: string }
     * type Folder = { type: 'folder'; file: string[]; id: string }
     *
     * const file: File = { type: 'file', name: 'file.txt', id: uuid() }
     * const folder: Folder = { type: 'folder', file: [file.id], id: uuid() }
     * // Add new data
     * await TaggedStorage.add(file)
     * await TaggedStorage.add(folder)
     * // Remove
     * await TaggedStorage.remove('file', file.id)
     * // Query
     * const result: File | undefined = await TaggedStorage.get('file', file.id)
     * const has: boolean = await TaggedStorage.has('file', file.id)
     * // iterate
     * for await (const { value } of TaggedStorage.iterate('file')) {
     *     // read only during the for...await loop
     *     // !! NO: await TaggedStorage.remove('file', file.id)
     *     console.log(value.name)
     * }
     * for await (const cursor of TaggedStorage.iterate_mutate('folder')) {
     *     cursor.value // Folder
     *     await cursor.update({ ...cursor.value, file: [] })
     *     await cursor.delete()
     * }
     */
    export interface TaggedStorage<Data extends IndexableTaggedUnion = IndexableTaggedUnion> {
        /**
         * Query an object from the database
         * @param type "type" field on the object
         * @param id "id" field on the object
         */
        get<T extends Data['type']>(type: T, id: Data['id']): Promise<(Data & { type: T }) | undefined>
        has<T extends Data['type']>(type: T, id: Data['id']): Promise<boolean>
        /**
         * Store a data into the database.
         * @param data Must be an object with "type" and "id"
         */
        add(data: Data): Promise<void>
        /**
         * Remove an object from the database
         * @param type "type" field on the object
         * @param id "id" field on the object
         */
        remove<T extends Data['type']>(type: T, id: Data['id']): Promise<void>
        /**
         * Iterate over the database of given type (readonly!)
         *
         * !!! During the iterate, you MUST NOT do anything that writes to the store (use iterate_mutate instead)
         *
         * !!! You MUST NOT do anything asynchronous before the iterate ends
         *
         * !!! Otherwise the transaction will be inactivate
         * @param type "type" field on the object
         */
        iterate<T extends Data['type']>(type: T): AsyncIterableIterator<TaggedStorageReadonlyCursor<Data, T>>
        /**
         * Iterate over the database of given type (read-write).
         *
         * !!! You MUST NOT do anything asynchronous before the iterate ends
         *
         * !!! Otherwise the transaction will be inactivate
         * @param type "type" field on the object
         */
        iterate_mutate<T extends Data['type']>(type: T): AsyncIterableIterator<TaggedStorageMutableCursor<Data, T>>
    }
    export type IndexableTaggedUnion = {
        type: string | number
        id: string | number
    }
    export interface TaggedStorageReadonlyCursor<Data extends IndexableTaggedUnion, T extends Data['type']> {
        value: Data & { type: T }
        // continueTo(id: Data['id']): Promise<void>
    }
    export interface TaggedStorageMutableCursor<Data extends IndexableTaggedUnion, T extends Data['type']>
        extends TaggedStorageReadonlyCursor<Data, T> {
        delete: () => Promise<void>
        update: (data: Data & { type: T }) => Promise<void>
    }
    export const taggedStorage: TaggedStorage<DatabaseStorage>
    //#endregion

    //#region Backup hook
    export interface BackupHandler {
        /**
         * This function will be called when user try to generate a new backup.
         * The return value will contribute to the backup file.
         *
         * If it returns a None, it will not contributes to the backup file.
         *
         * If it returns a Some<T>, T will be serialized by JSON.stringify and added into the backup file.
         */
        onBackup(): Promise<Option<unknown>>
        /**
         * This function will be called when the user try to restore a backup file,
         * and there is some data associated with this plugin.
         *
         * @param data The serialized backup content previously returned by `onBackup`.
         * You MUST treat the data as untrustful content because it can be modified by the user.
         */
        onRestore(data: unknown): Promise<Result<void, Error>>
    }
    /**
     * Register a backup handler.
     *
     * `manifest.contributes.backup` must be true to attach a backup handler.
     *
     * This function can be only called once. Second call to this function cause an exception.
     */
    export function registerBackupHandler(handler: BackupHandler): void
    //#endregion
}
