declare module 'postman-code-generators' {
  export function convert(
    language: string,
    library: string,
    request: object,
    options: object,
    callback?: (error: Error | null, snippet: string) => void
  ): void;
}

declare module 'postman-collection' {
  interface RequestBody {
    mode: string;
    raw?: string;
    options?: {
      raw: {
        language: string;
      };
    };
  }

  interface RequestHeader {
    key: string;
    value: string;
  }

  interface RequestDefinition {
    url: string;
    method: string;
    header?: RequestHeader[];
    body?: RequestBody;
  }

  class Request {
    constructor(options: RequestDefinition);
    url: string;
    method: string;
    headers: RequestHeader[];
    body?: RequestBody;
  }

  export { Request };
}
