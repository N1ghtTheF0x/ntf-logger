import { LoggerLevel } from "./level"
import { ILogger } from "./types"

/**
 * Abstract class that only needs `print` to be implemented
 */
export abstract class Logger implements ILogger
{
//#region Constructors
    /**
     * Create a `Logger` object with label `label`
     * @param label The name of the Logger
     */
    public constructor(public readonly label: string)
    {

    }
//#endregion
//#region Methods
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
//#endregion
//#region Symbols
    public get [Symbol.toStringTag](): "Logger"
    {
        return "Logger"
    }
    public [Symbol.toPrimitive](hint: "string" | "number" | "default")
    {
        switch(hint)
        {
            default:
            case "string":
            case "default":
                return this.toString()
            case "number":
                throw new TypeError("cannot convert logger to number")
        }
    }
    /**
     * Returns a string representation of an object.
     */
    public toString(): `Logger<${string}>`
    {
        return `Logger<${this.label}>`
    }
    /**
     * Convert the logger into a JSON object. This is used by `JSON.stringify`
     */
    public toJSON()
    {
        return {
            label: this.label
        }
    }
//#endregion
}