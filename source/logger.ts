import LoggerLevel from "./level"
import { ILogger } from "./types"

/**
 * Abstract class that only needs `print` to be implemented
 */
abstract class Logger implements ILogger
{
    /**
     * Create a `Logger` object with label `label`
     * @param label The name of the Logger
     */
    public constructor(public readonly label: string)
    {

    }
    public abstract print<T extends Array<any>>(level: LoggerLevel, ...args: T): void
    /**
     * Same as `Logger.print("info",...args)`
     * @see {@link ILogger.print}
     */
    public info(...args: Array<any>)
    {
        this.print("info",...args)
    }
    /**
     * Same as `Logger.print("warn",...args)`
     * @see {@link ILogger.print}
     */
    public warn(...args: Array<any>)
    {
        this.print("warn",...args)
    }
    /**
     * Same as `Logger.print("error",...args)`
     * @see {@link ILogger.print}
     */
    public error(...args: Array<any>)
    {
        this.print("error",...args)
    }
    /**
     * Same as `Logger.print("debug",...args)`
     * @see {@link ILogger.print}
     */
    public debug(...args: Array<any>)
    {
        this.print("debug",...args)
    }
    /**
     * Same as `Logger.print("trace",...args)`
     * @see {@link ILogger.print}
     */
    public trace(...args: Array<any>)
    {
        this.print("trace",...args)
    }
}

export default Logger