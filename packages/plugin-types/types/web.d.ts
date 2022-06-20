// This file is generated from @types/web


/////////////////////////////
/// Window APIs
/////////////////////////////
interface AddEventListenerOptions extends EventListenerOptions {
    once?: boolean;
    passive?: boolean;
    signal?: AbortSignal;
}
interface AesCbcParams extends Algorithm {
    iv: BufferSource;
}
interface AesCtrParams extends Algorithm {
    counter: BufferSource;
    length: number;
}
interface AesDerivedKeyParams extends Algorithm {
    length: number;
}
interface AesGcmParams extends Algorithm {
    additionalData?: BufferSource;
    iv: BufferSource;
    tagLength?: number;
}
interface AesKeyAlgorithm extends KeyAlgorithm {
    length: number;
}
interface AesKeyGenParams extends Algorithm {
    length: number;
}
interface Algorithm {
    name: string;
}
interface BlobPropertyBag {
    endings?: EndingType;
    type?: string;
}
interface CryptoKeyPair {
    privateKey: CryptoKey;
    publicKey: CryptoKey;
}
interface EcKeyGenParams extends Algorithm {
    namedCurve: NamedCurve;
}
interface EcKeyImportParams extends Algorithm {
    namedCurve: NamedCurve;
}
interface EcdhKeyDeriveParams extends Algorithm {
    public: CryptoKey;
}
interface EcdsaParams extends Algorithm {
    hash: HashAlgorithmIdentifier;
}
interface EventInit {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
}
interface EventListenerOptions {
    capture?: boolean;
}
interface FilePropertyBag extends BlobPropertyBag {
    lastModified?: number;
}
interface HkdfParams extends Algorithm {
    hash: HashAlgorithmIdentifier;
    info: BufferSource;
    salt: BufferSource;
}
interface HmacImportParams extends Algorithm {
    hash: HashAlgorithmIdentifier;
    length?: number;
}
interface HmacKeyGenParams extends Algorithm {
    hash: HashAlgorithmIdentifier;
    length?: number;
}
interface JsonWebKey {
    alg?: string;
    crv?: string;
    d?: string;
    dp?: string;
    dq?: string;
    e?: string;
    ext?: boolean;
    k?: string;
    key_ops?: string[];
    kty?: string;
    n?: string;
    oth?: RsaOtherPrimesInfo[];
    p?: string;
    q?: string;
    qi?: string;
    use?: string;
    x?: string;
    y?: string;
}
interface KeyAlgorithm {
    name: string;
}
interface Pbkdf2Params extends Algorithm {
    hash: HashAlgorithmIdentifier;
    iterations: number;
    salt: BufferSource;
}
interface QueuingStrategy<T = any> {
    highWaterMark?: number;
    size?: QueuingStrategySize<T>;
}
interface ReadableStreamReadDoneResult {
    done: true;
    value?: undefined;
}
interface ReadableStreamReadValueResult<T> {
    done: false;
    value: T;
}
interface ReadableWritablePair<R = any, W = any> {
    readable: ReadableStream<R>;
    /**
     * Provides a convenient, chainable way of piping this readable stream through a transform stream (or any other { writable, readable } pair). It simply pipes the stream into the writable side of the supplied pair, and returns the readable side for further use.
     *
     * Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader.
     */
    writable: WritableStream<W>;
}
interface RequestInit {
    /** A BodyInit object or null to set request's body. */
    body?: BodyInit | null;
    /** A string indicating how the request will interact with the browser's cache to set request's cache. */
    cache?: RequestCache;
    /** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
    credentials?: RequestCredentials;
    /** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
    headers?: HeadersInit;
    /** A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
    integrity?: string;
    /** A boolean to set request's keepalive. */
    keepalive?: boolean;
    /** A string to set request's method. */
    method?: string;
    /** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
    mode?: RequestMode;
    /** A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
    redirect?: RequestRedirect;
    /** A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. */
    referrer?: string;
    /** A referrer policy to set request's referrerPolicy. */
    referrerPolicy?: ReferrerPolicy;
    /** An AbortSignal to set request's signal. */
    signal?: AbortSignal | null;
    /** Can only be null. Used to disassociate request from any Window. */
    window?: null;
}
interface ResponseInit {
    headers?: HeadersInit;
    status?: number;
    statusText?: string;
}
interface RsaHashedImportParams extends Algorithm {
    hash: HashAlgorithmIdentifier;
}
interface RsaHashedKeyGenParams extends RsaKeyGenParams {
    hash: HashAlgorithmIdentifier;
}
interface RsaKeyGenParams extends Algorithm {
    modulusLength: number;
    publicExponent: BigInteger;
}
interface RsaOaepParams extends Algorithm {
    label?: BufferSource;
}
interface RsaOtherPrimesInfo {
    d?: string;
    r?: string;
    t?: string;
}
interface RsaPssParams extends Algorithm {
    saltLength: number;
}
interface StreamPipeOptions {
    preventAbort?: boolean;
    preventCancel?: boolean;
    /**
     * Pipes this readable stream to a given writable stream destination. The way in which the piping process behaves under various error conditions can be customized with a number of passed options. It returns a promise that fulfills when the piping process completes successfully, or rejects if any errors were encountered.
     *
     * Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader.
     *
     * Errors and closures of the source and destination streams propagate as follows:
     *
     * An error in this source readable stream will abort destination, unless preventAbort is truthy. The returned promise will be rejected with the source's error, or with any error that occurs during aborting the destination.
     *
     * An error in destination will cancel this source readable stream, unless preventCancel is truthy. The returned promise will be rejected with the destination's error, or with any error that occurs during canceling the source.
     *
     * When this source readable stream closes, destination will be closed, unless preventClose is truthy. The returned promise will be fulfilled once this process completes, unless an error is encountered while closing the destination, in which case it will be rejected with that error.
     *
     * If destination starts out closed or closing, this source readable stream will be canceled, unless preventCancel is true. The returned promise will be rejected with an error indicating piping to a closed stream failed, or with any error that occurs during canceling the source.
     *
     * The signal option can be set to an AbortSignal to allow aborting an ongoing pipe operation via the corresponding AbortController. In this case, this source readable stream will be canceled, and destination aborted, unless the respective options preventCancel or preventAbort are set.
     */
    preventClose?: boolean;
    signal?: AbortSignal;
}
interface TextDecodeOptions {
    stream?: boolean;
}
interface TextDecoderOptions {
    fatal?: boolean;
    ignoreBOM?: boolean;
}
interface TextEncoderEncodeIntoResult {
    read?: number;
    written?: number;
}
interface UnderlyingSink<W = any> {
    abort?: UnderlyingSinkAbortCallback;
    close?: UnderlyingSinkCloseCallback;
    start?: UnderlyingSinkStartCallback;
    type?: undefined;
    write?: UnderlyingSinkWriteCallback<W>;
}
interface UnderlyingSource<R = any> {
    cancel?: UnderlyingSourceCancelCallback;
    pull?: UnderlyingSourcePullCallback<R>;
    start?: UnderlyingSourceStartCallback<R>;
    type?: undefined;
}
interface AbortSignalEventMap {
    "abort": Event;
}
/** A signal object that allows you to communicate with a DOM request (such as a Fetch) and abort it if required via an AbortController object. */
interface AbortSignal extends EventTarget {
    /** Returns true if this AbortSignal's AbortController has signaled to abort, and false otherwise. */
    readonly aborted: boolean;
    onabort: ((this: AbortSignal, ev: Event) => any) | null;
    readonly reason: any;
    throwIfAborted(): void;
    addEventListener<K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare var AbortSignal: {
    prototype: AbortSignal;
    new (): AbortSignal;
};
/** A file-like object of immutable, raw data. Blobs represent data that isn't necessarily in a JavaScript-native format. The File interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system. */
interface Blob {
    readonly size: number;
    readonly type: string;
    arrayBuffer(): Promise<ArrayBuffer>;
    slice(start?: number, end?: number, contentType?: string): Blob;
    stream(): ReadableStream<Uint8Array>;
    text(): Promise<string>;
}
declare var Blob: {
    prototype: Blob;
    new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
};
interface Body {
    readonly body: ReadableStream<Uint8Array> | null;
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
}
/** Basic cryptography features available in the current context. It allows access to a cryptographically strong random number generator and to cryptographic primitives. */
interface Crypto {
    /** Available only in secure contexts. */
    readonly subtle: SubtleCrypto;
    getRandomValues<T extends ArrayBufferView | null>(array: T): T;
    /** Available only in secure contexts. */
    randomUUID(): string;
}
declare var Crypto: {
    prototype: Crypto;
    new (): Crypto;
};
/**
 * The CryptoKey dictionary of the Web Crypto API represents a cryptographic key.
 * Available only in secure contexts.
 */
interface CryptoKey {
    readonly algorithm: KeyAlgorithm;
    readonly extractable: boolean;
    readonly type: KeyType;
    readonly usages: KeyUsage[];
}
declare var CryptoKey: {
    prototype: CryptoKey;
    new (): CryptoKey;
};
/** An event which takes place in the DOM. */
interface Event {
    /** Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise. */
    readonly bubbles: boolean;
    cancelBubble: boolean;
    /** Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method. */
    readonly cancelable: boolean;
    /** Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise. */
    readonly composed: boolean;
    /** Returns the object whose event listener's callback is currently being invoked. */
    readonly currentTarget: EventTarget | null;
    /** Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise. */
    readonly defaultPrevented: boolean;
    /** Returns the event's phase, which is one of NONE, CAPTURING_PHASE, AT_TARGET, and BUBBLING_PHASE. */
    readonly eventPhase: number;
    /** Returns true if event was dispatched by the user agent, and false otherwise. */
    readonly isTrusted: boolean;
    /** @deprecated */
    returnValue: boolean;
    /** @deprecated */
    readonly srcElement: EventTarget | null;
    /** Returns the object to which event is dispatched (its target). */
    readonly target: EventTarget | null;
    /** Returns the event's timestamp as the number of milliseconds measured relative to the time origin. */
    readonly timeStamp: DOMHighResTimeStamp;
    /** Returns the type of event, e.g. "click", "hashchange", or "submit". */
    readonly type: string;
    /** Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is "closed" that are not reachable from event's currentTarget. */
    composedPath(): EventTarget[];
    /** @deprecated */
    initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void;
    /** If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled. */
    preventDefault(): void;
    /** Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects. */
    stopImmediatePropagation(): void;
    /** When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object. */
    stopPropagation(): void;
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
    readonly NONE: number;
}
declare var Event: {
    prototype: Event;
    new (type: string, eventInitDict?: EventInit): Event;
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
    readonly NONE: number;
};
interface EventListener {
    (evt: Event): void;
}
interface EventListenerObject {
    handleEvent(object: Event): void;
}
/** EventTarget is a DOM interface implemented by objects that can receive events and may have listeners for them. */
interface EventTarget {
    /**
     * Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched.
     *
     * The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture.
     *
     * When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT_TARGET.
     *
     * When set to true, options's passive indicates that the callback will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in § 2.8 Observing event listeners.
     *
     * When set to true, options's once indicates that the callback will only be invoked once after which the event listener will be removed.
     *
     * If an AbortSignal is passed for options's signal, then the event listener will be removed when signal is aborted.
     *
     * The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture.
     */
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void;
    /** Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise. */
    dispatchEvent(event: Event): boolean;
    /** Removes the event listener in target's event listener list with the same type, callback, and options. */
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
}
declare var EventTarget: {
    prototype: EventTarget;
    new (): EventTarget;
};
/** Provides information about files and allows JavaScript in a web page to access their content. */
interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
    readonly webkitRelativePath: string;
}
declare var File: {
    prototype: File;
    new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
};
/** Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data". */
interface FormData {
    append(name: string, value: string | Blob, fileName?: string): void;
    delete(name: string): void;
    get(name: string): FormDataEntryValue | null;
    getAll(name: string): FormDataEntryValue[];
    has(name: string): boolean;
    set(name: string, value: string | Blob, fileName?: string): void;
    forEach(callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void;
}
declare var FormData: {
    prototype: FormData;
};
/** This Fetch API interface allows you to perform various actions on HTTP request and response headers. These actions include retrieving, setting, adding to, and removing. A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.  You can add to this using methods like append() (see Examples.) In all methods of this interface, header names are matched by case-insensitive byte sequence. */
interface Headers {
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    has(name: string): boolean;
    set(name: string, value: string): void;
    forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
}
declare var Headers: {
    prototype: Headers;
    new (init?: HeadersInit): Headers;
};
/** This Streams API interface represents a readable stream of byte data. The Fetch API offers a concrete instance of a ReadableStream through the body property of a Response object. */
interface ReadableStream<R = any> {
    readonly locked: boolean;
    cancel(reason?: any): Promise<void>;
    getReader(): ReadableStreamDefaultReader<R>;
    pipeThrough<T>(transform: ReadableWritablePair<T, R>, options?: StreamPipeOptions): ReadableStream<T>;
    pipeTo(destination: WritableStream<R>, options?: StreamPipeOptions): Promise<void>;
    tee(): [
        ReadableStream<R>,
        ReadableStream<R>
    ];
}
declare var ReadableStream: {
    prototype: ReadableStream;
    new <R = any>(underlyingSource?: UnderlyingSource<R>, strategy?: QueuingStrategy<R>): ReadableStream<R>;
};
interface ReadableStreamDefaultController<R = any> {
    readonly desiredSize: number | null;
    close(): void;
    enqueue(chunk?: R): void;
    error(e?: any): void;
}
declare var ReadableStreamDefaultController: {
    prototype: ReadableStreamDefaultController;
    new (): ReadableStreamDefaultController;
};
interface ReadableStreamDefaultReader<R = any> extends ReadableStreamGenericReader {
    read(): Promise<ReadableStreamReadResult<R>>;
    releaseLock(): void;
}
declare var ReadableStreamDefaultReader: {
    prototype: ReadableStreamDefaultReader;
    new <R = any>(stream: ReadableStream<R>): ReadableStreamDefaultReader<R>;
};
interface ReadableStreamGenericReader {
    readonly closed: Promise<undefined>;
    cancel(reason?: any): Promise<void>;
}
/** This Fetch API interface represents a resource request. */
interface Request extends Body {
    /** Returns the cache mode associated with request, which is a string indicating how the request will interact with the browser's cache when fetching. */
    readonly cache: RequestCache;
    /** Returns the credentials mode associated with request, which is a string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. */
    readonly credentials: RequestCredentials;
    /** Returns the kind of resource requested by request, e.g., "document" or "script". */
    readonly destination: RequestDestination;
    /** Returns a Headers object consisting of the headers associated with request. Note that headers added in the network layer by the user agent will not be accounted for in this object, e.g., the "Host" header. */
    readonly headers: Headers;
    /** Returns request's subresource integrity metadata, which is a cryptographic hash of the resource being fetched. Its value consists of multiple hashes separated by whitespace. [SRI] */
    readonly integrity: string;
    /** Returns a boolean indicating whether or not request can outlive the global in which it was created. */
    readonly keepalive: boolean;
    /** Returns request's HTTP method, which is "GET" by default. */
    readonly method: string;
    /** Returns the mode associated with request, which is a string indicating whether the request will use CORS, or will be restricted to same-origin URLs. */
    readonly mode: RequestMode;
    /** Returns the redirect mode associated with request, which is a string indicating how redirects for the request will be handled during fetching. A request will follow redirects by default. */
    readonly redirect: RequestRedirect;
    /** Returns the referrer of request. Its value can be a same-origin URL if explicitly set in init, the empty string to indicate no referrer, and "about:client" when defaulting to the global's default. This is used during fetching to determine the value of the `Referer` header of the request being made. */
    readonly referrer: string;
    /** Returns the referrer policy associated with request. This is used during fetching to compute the value of the request's referrer. */
    readonly referrerPolicy: ReferrerPolicy;
    /** Returns the signal associated with request, which is an AbortSignal object indicating whether or not request has been aborted, and its abort event handler. */
    readonly signal: AbortSignal;
    /** Returns the URL of request as a string. */
    readonly url: string;
    clone(): Request;
}
declare var Request: {
    prototype: Request;
    new (input: RequestInfo | URL, init?: RequestInit): Request;
};
/** This Fetch API interface represents the response to a request. */
interface Response extends Body {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
}
declare var Response: {
    prototype: Response;
    new (body?: BodyInit | null, init?: ResponseInit): Response;
    error(): Response;
    redirect(url: string | URL, status?: number): Response;
};
/**
 * This Web Crypto API interface provides a number of low-level cryptographic functions. It is accessed via the Crypto.subtle properties available in a window context (via Window.crypto).
 * Available only in secure contexts.
 */
interface SubtleCrypto {
    decrypt(algorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams, key: CryptoKey, data: BufferSource): Promise<any>;
    deriveBits(algorithm: AlgorithmIdentifier | EcdhKeyDeriveParams | HkdfParams | Pbkdf2Params, baseKey: CryptoKey, length: number): Promise<ArrayBuffer>;
    deriveKey(algorithm: AlgorithmIdentifier | EcdhKeyDeriveParams | HkdfParams | Pbkdf2Params, baseKey: CryptoKey, derivedKeyType: AlgorithmIdentifier | AesDerivedKeyParams | HmacImportParams | HkdfParams | Pbkdf2Params, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
    digest(algorithm: AlgorithmIdentifier, data: BufferSource): Promise<ArrayBuffer>;
    encrypt(algorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams, key: CryptoKey, data: BufferSource): Promise<any>;
    exportKey(format: "jwk", key: CryptoKey): Promise<JsonWebKey>;
    exportKey(format: Exclude<KeyFormat, "jwk">, key: CryptoKey): Promise<ArrayBuffer>;
    generateKey(algorithm: RsaHashedKeyGenParams | EcKeyGenParams, extractable: boolean, keyUsages: ReadonlyArray<KeyUsage>): Promise<CryptoKeyPair>;
    generateKey(algorithm: AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params, extractable: boolean, keyUsages: ReadonlyArray<KeyUsage>): Promise<CryptoKey>;
    generateKey(algorithm: AlgorithmIdentifier, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKeyPair | CryptoKey>;
    importKey(format: "jwk", keyData: JsonWebKey, algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: ReadonlyArray<KeyUsage>): Promise<CryptoKey>;
    importKey(format: Exclude<KeyFormat, "jwk">, keyData: BufferSource, algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
    sign(algorithm: AlgorithmIdentifier | RsaPssParams | EcdsaParams, key: CryptoKey, data: BufferSource): Promise<ArrayBuffer>;
    unwrapKey(format: KeyFormat, wrappedKey: BufferSource, unwrappingKey: CryptoKey, unwrapAlgorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams, unwrappedKeyAlgorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
    verify(algorithm: AlgorithmIdentifier | RsaPssParams | EcdsaParams, key: CryptoKey, signature: BufferSource, data: BufferSource): Promise<boolean>;
    wrapKey(format: KeyFormat, key: CryptoKey, wrappingKey: CryptoKey, wrapAlgorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams): Promise<ArrayBuffer>;
}
declare var SubtleCrypto: {
    prototype: SubtleCrypto;
    new (): SubtleCrypto;
};
/** A decoder for a specific method, that is a specific character encoding, like utf-8, iso-8859-2, koi8, cp1261, gbk, etc. A decoder takes a stream of bytes as input and emits a stream of code points. For a more scalable, non-native library, see StringView – a C-like representation of strings based on typed arrays. */
interface TextDecoder extends TextDecoderCommon {
    /**
     * Returns the result of running encoding's decoder. The method can be invoked zero or more times with options's stream set to true, and then once without options's stream (or set to false), to process a fragmented input. If the invocation without options's stream (or set to false) has no input, it's clearest to omit both arguments.
     *
     * ```
     * var string = "", decoder = new TextDecoder(encoding), buffer;
     * while(buffer = next_chunk()) {
     *   string += decoder.decode(buffer, {stream:true});
     * }
     * string += decoder.decode(); // end-of-queue
     * ```
     *
     * If the error mode is "fatal" and encoding's decoder returns error, throws a TypeError.
     */
    decode(input?: BufferSource, options?: TextDecodeOptions): string;
}
declare var TextDecoder: {
    prototype: TextDecoder;
    new (label?: string, options?: TextDecoderOptions): TextDecoder;
};
interface TextDecoderCommon {
    /** Returns encoding's name, lowercased. */
    readonly encoding: string;
    /** Returns true if error mode is "fatal", otherwise false. */
    readonly fatal: boolean;
    /** Returns the value of ignore BOM. */
    readonly ignoreBOM: boolean;
}
/** TextEncoder takes a stream of code points as input and emits a stream of bytes. For a more scalable, non-native library, see StringView – a C-like representation of strings based on typed arrays. */
interface TextEncoder extends TextEncoderCommon {
    /** Returns the result of running UTF-8's encoder. */
    encode(input?: string): Uint8Array;
    /** Runs the UTF-8 encoder on source, stores the result of that operation into destination, and returns the progress made as an object wherein read is the number of converted code units of source and written is the number of bytes modified in destination. */
    encodeInto(source: string, destination: Uint8Array): TextEncoderEncodeIntoResult;
}
declare var TextEncoder: {
    prototype: TextEncoder;
    new (): TextEncoder;
};
interface TextEncoderCommon {
    /** Returns "utf-8". */
    readonly encoding: string;
}
/** The URL interface represents an object providing static methods used for creating object URLs. */
interface URL {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    toString(): string;
    readonly origin: string;
    password: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    readonly searchParams: URLSearchParams;
    username: string;
    toJSON(): string;
}
declare var URL: {
    prototype: URL;
    new (url: string | URL, base?: string | URL): URL;
    revokeObjectURL(url: string): void;
};
interface URLSearchParams {
    /** Appends a specified key/value pair as a new search parameter. */
    append(name: string, value: string): void;
    /** Deletes the given search parameter, and its associated value, from the list of all search parameters. */
    delete(name: string): void;
    /** Returns the first value associated to the given search parameter. */
    get(name: string): string | null;
    /** Returns all the values association with a given search parameter. */
    getAll(name: string): string[];
    /** Returns a Boolean indicating if such a search parameter exists. */
    has(name: string): boolean;
    /** Sets the value associated to a given search parameter to the given value. If there were several values, delete the others. */
    set(name: string, value: string): void;
    sort(): void;
    /** Returns a string containing a query string suitable for use in a URL. Does not include the question mark. */
    toString(): string;
    forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void;
}
declare var URLSearchParams: {
    prototype: URLSearchParams;
    new (init?: string[][] | Record<string, string> | string | URLSearchParams): URLSearchParams;
    toString(): string;
};
/** This Streams API interface provides a standard abstraction for writing streaming data to a destination, known as a sink. This object comes with built-in backpressure and queuing. */
interface WritableStream<W = any> {
    readonly locked: boolean;
    abort(reason?: any): Promise<void>;
    close(): Promise<void>;
    getWriter(): WritableStreamDefaultWriter<W>;
}
declare var WritableStream: {
    prototype: WritableStream;
    new <W = any>(underlyingSink?: UnderlyingSink<W>, strategy?: QueuingStrategy<W>): WritableStream<W>;
};
/** This Streams API interface represents a controller allowing control of a WritableStream's state. When constructing a WritableStream, the underlying sink is given a corresponding WritableStreamDefaultController instance to manipulate. */
interface WritableStreamDefaultController {
    readonly signal: AbortSignal;
    error(e?: any): void;
}
declare var WritableStreamDefaultController: {
    prototype: WritableStreamDefaultController;
    new (): WritableStreamDefaultController;
};
/** This Streams API interface is the object returned by WritableStream.getWriter() and once created locks the < writer to the WritableStream ensuring that no other streams can write to the underlying sink. */
interface WritableStreamDefaultWriter<W = any> {
    readonly closed: Promise<undefined>;
    readonly desiredSize: number | null;
    readonly ready: Promise<undefined>;
    abort(reason?: any): Promise<void>;
    close(): Promise<void>;
    releaseLock(): void;
    write(chunk?: W): Promise<void>;
}
declare var WritableStreamDefaultWriter: {
    prototype: WritableStreamDefaultWriter;
    new <W = any>(stream: WritableStream<W>): WritableStreamDefaultWriter<W>;
};
interface QueuingStrategySize<T = any> {
    (chunk: T): number;
}
interface UnderlyingSinkAbortCallback {
    (reason?: any): void | PromiseLike<void>;
}
interface UnderlyingSinkCloseCallback {
    (): void | PromiseLike<void>;
}
interface UnderlyingSinkStartCallback {
    (controller: WritableStreamDefaultController): any;
}
interface UnderlyingSinkWriteCallback<W> {
    (chunk: W, controller: WritableStreamDefaultController): void | PromiseLike<void>;
}
interface UnderlyingSourceCancelCallback {
    (reason?: any): void | PromiseLike<void>;
}
interface UnderlyingSourcePullCallback<R> {
    (controller: ReadableStreamController<R>): void | PromiseLike<void>;
}
interface UnderlyingSourceStartCallback<R> {
    (controller: ReadableStreamController<R>): any;
}
declare var crypto: Crypto;
declare function atob(data: string): string;
declare function btoa(data: string): string;
declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
type AlgorithmIdentifier = Algorithm | string;
type BigInteger = Uint8Array;
type BlobPart = BufferSource | Blob | string;
type BodyInit = ReadableStream | XMLHttpRequestBodyInit;
type BufferSource = ArrayBufferView | ArrayBuffer;
type DOMHighResTimeStamp = number;
type EventListenerOrEventListenerObject = EventListener | EventListenerObject;
type FormDataEntryValue = File | string;
type HashAlgorithmIdentifier = AlgorithmIdentifier;
type HeadersInit = [
    string,
    string
][] | Record<string, string> | Headers;
type NamedCurve = string;
type ReadableStreamController<T> = ReadableStreamDefaultController<T>;
type ReadableStreamReadResult<T> = ReadableStreamReadValueResult<T> | ReadableStreamReadDoneResult;
type RequestInfo = Request | string;
type XMLHttpRequestBodyInit = Blob | BufferSource | FormData | URLSearchParams | string;
type EndingType = "native" | "transparent";
type KeyFormat = "jwk" | "pkcs8" | "raw" | "spki";
type KeyType = "private" | "public" | "secret";
type KeyUsage = "decrypt" | "deriveBits" | "deriveKey" | "encrypt" | "sign" | "unwrapKey" | "verify" | "wrapKey";
type ReferrerPolicy = "" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
type RequestCache = "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";
type RequestCredentials = "include" | "omit" | "same-origin";
type RequestDestination = "" | "audio" | "audioworklet" | "document" | "embed" | "font" | "frame" | "iframe" | "image" | "manifest" | "object" | "paintworklet" | "report" | "script" | "sharedworker" | "style" | "track" | "video" | "worker" | "xslt";
type RequestMode = "cors" | "navigate" | "no-cors" | "same-origin";
type RequestRedirect = "error" | "follow" | "manual";
type ResponseType = "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";
interface FormData {
    [Symbol.iterator](): IterableIterator<[
        string,
        FormDataEntryValue
    ]>;
    /** Returns an array of key, value pairs for every entry in the list. */
    entries(): IterableIterator<[
        string,
        FormDataEntryValue
    ]>;
    /** Returns a list of keys in the list. */
    keys(): IterableIterator<string>;
    /** Returns a list of values in the list. */
    values(): IterableIterator<FormDataEntryValue>;
}
interface Headers {
    [Symbol.iterator](): IterableIterator<[
        string,
        string
    ]>;
    /** Returns an iterator allowing to go through all key/value pairs contained in this object. */
    entries(): IterableIterator<[
        string,
        string
    ]>;
    /** Returns an iterator allowing to go through all keys of the key/value pairs contained in this object. */
    keys(): IterableIterator<string>;
    /** Returns an iterator allowing to go through all values of the key/value pairs contained in this object. */
    values(): IterableIterator<string>;
}
interface SubtleCrypto {
    deriveKey(algorithm: AlgorithmIdentifier | EcdhKeyDeriveParams | HkdfParams | Pbkdf2Params, baseKey: CryptoKey, derivedKeyType: AlgorithmIdentifier | AesDerivedKeyParams | HmacImportParams | HkdfParams | Pbkdf2Params, extractable: boolean, keyUsages: Iterable<KeyUsage>): Promise<CryptoKey>;
    generateKey(algorithm: RsaHashedKeyGenParams | EcKeyGenParams, extractable: boolean, keyUsages: ReadonlyArray<KeyUsage>): Promise<CryptoKeyPair>;
    generateKey(algorithm: AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params, extractable: boolean, keyUsages: ReadonlyArray<KeyUsage>): Promise<CryptoKey>;
    generateKey(algorithm: AlgorithmIdentifier, extractable: boolean, keyUsages: Iterable<KeyUsage>): Promise<CryptoKeyPair | CryptoKey>;
    importKey(format: "jwk", keyData: JsonWebKey, algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: ReadonlyArray<KeyUsage>): Promise<CryptoKey>;
    importKey(format: Exclude<KeyFormat, "jwk">, keyData: BufferSource, algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: Iterable<KeyUsage>): Promise<CryptoKey>;
    unwrapKey(format: KeyFormat, wrappedKey: BufferSource, unwrappingKey: CryptoKey, unwrapAlgorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams, unwrappedKeyAlgorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: Iterable<KeyUsage>): Promise<CryptoKey>;
}
interface URLSearchParams {
    [Symbol.iterator](): IterableIterator<[
        string,
        string
    ]>;
    /** Returns an array of key, value pairs for every entry in the search params. */
    entries(): IterableIterator<[
        string,
        string
    ]>;
    /** Returns a list of keys in the search params. */
    keys(): IterableIterator<string>;
    /** Returns a list of values in the search params. */
    values(): IterableIterator<string>;
}
