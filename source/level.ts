/**
 * Possible values for logger level
 */
type LoggerLevel = "info" | "warn" | "error" | "debug" | "trace"

/**
 * The order of the logger levels
 */
export const LoggerLevelOrder: Readonly<Record<LoggerLevel,number>> = {
    info: 0,
    warn: 1,
    error: 2,
    debug: 3,
    trace: 4
}

/**
 * A mapped object containing color information for each logger level
 */
export type LevelColorMap<T> = Readonly<Record<LoggerLevel,T>>

export default LoggerLevel