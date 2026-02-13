export class TokenCreationError extends Error {
  constructor(
    message: string,
    public step?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'TokenCreationError';
  }
}

export class NadFunApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'NadFunApiError';
  }
}

export class MonadRpcError extends Error {
  constructor(
    message: string,
    public code?: string | number
  ) {
    super(message);
    this.name = 'MonadRpcError';
  }
}

export function handleApiError(error: unknown): string {
  if (error instanceof NadFunApiError) {
    return `Nad.fun API Error: ${error.message}`;
  }
  if (error instanceof MonadRpcError) {
    return `Monad RPC Error: ${error.message}`;
  }
  if (error instanceof TokenCreationError) {
    return `Token Creation Error: ${error.message}`;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}
