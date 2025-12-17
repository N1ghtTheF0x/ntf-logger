/**
 * Possible values for logger level
 */
export type LoggerLevel = "info" | "warn" | "error" | "debug" | "trace"

/**
 * A mapped object containing color information for each logger level
 */
export type LevelColorMap<T> = Readonly<Record<LoggerLevel,T>>