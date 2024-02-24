type LoggerLevel = "info" | "warn" | "error" | "debug" | "trace"

export const LoggerLevelOrder: Readonly<Record<LoggerLevel,number>> = {
    info: 0,
    warn: 1,
    error: 2,
    debug: 3,
    trace: 4
}

export type LevelColorMap<T> = Readonly<Record<LoggerLevel,T>>

export default LoggerLevel