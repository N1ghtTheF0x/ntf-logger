import { AnsiLogger } from "./ansi"
import { CSSLogger } from "./css"
import type Logger from "./logger"

/**
 * Create a logger instance by using the correct runtime implementation
 * @param label The name of the logger
 * @returns A logger which is either {@link CSSLogger} or {@link AnsiLogger} if browser or server
 */
export function createLogger(label: string): Logger
{
    if("window" in globalThis)
        return new CSSLogger(label)
    return new AnsiLogger(label)
}