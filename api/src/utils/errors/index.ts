import { Error as dbError } from "mongoose";

export * from "./operation.error";


/**
 * Returns the corresponding HTTP status code for a given error.
 * @param error The error to map to an HTTP status code.
 * @returns The corresponding HTTP status code for the given error.
 */
export function errorToRestStatus(error: Error): number {

  // 400
  if (
    error instanceof TypeError ||
    error instanceof dbError.ValidationError ||
    error instanceof URIError
  )
    return 400;

  // 401
  // if (false) return 401;

  // 403
  // if (false) return 403;

  // 404
  // if (false) return 404;

  // 409
  // if (false) return 409;

  // 500
  // if (false) return 500;

  return 500;
}


/**
 * Formats an error response object with the given response code, message, and optional details.
 * @param responseCode The HTTP response code to include in the error response object.
 * @param responseMessage The error message to include in the error response object.
 * @param details Optional additional details to include in the error response object.
 * @returns An error response object with the given response code, message, and optional details.
 */
export function formatErrorResponse(
  responseCode: number,
  responseMessage: string,
  details?: unknown
): { code: number; message: string; details?: unknown } {
  return {
    ...{
      code: responseCode,
      message: responseMessage,
    },
    ...(details ? { details } : null),
  };
}