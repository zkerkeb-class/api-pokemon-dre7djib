import { HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE } from "../../utils/constants.js";

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(HTTP_RESPONSE_CODE.SERVER_ERROR).send(APP_ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
}

export default errorHandler;