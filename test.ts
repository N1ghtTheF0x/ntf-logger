import { AnsiLogger } from "./source/ansi"

const logger = new AnsiLogger("Test")

logger.info("balls")
const err = new Error("fuck")
Error.captureStackTrace(err)
logger.error(err)
logger.warn("maybe")
logger.debug("todo")