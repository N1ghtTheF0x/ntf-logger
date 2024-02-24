import LoggerLevel from "./level"

/**
 * Type for creating method for each level name
 */
export type ILoggerBase = {
    [level in LoggerLevel]: (...args: Array<any>) => void
}

/**
 * Interface for a custom Logger object
 */
export interface ILogger extends ILoggerBase
{
    /**
     * The label of the Logger, can be anything (name of service, name of thread, etc.)
     */
    readonly label: string
    /**
     * Prints anything in `args` with level `level` in the console with pretty datetime, level and label (with colors)
     * @param level The print level, valid options are `"info"`, `"warn"`, `"error"`, `"debug"` and `"trace"`
     * @param args Literally anything
     */
    print<T extends Array<any>>(level: LoggerLevel,...args: T): void
}