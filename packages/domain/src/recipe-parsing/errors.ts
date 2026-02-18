import { DomainError } from "../errors";

export class InvalidParsedRecipeDataError extends DomainError {
  readonly code = "INVALID_PARSED_RECIPE_DATA";
  readonly httpStatus = 400;

  constructor(message = "Invalid parsed recipe data") {
    super(message);
  }
}

export class ParsingError extends DomainError {
  readonly code = "PARSING_FAILED";
  readonly httpStatus = 500;

  constructor(message = "Parsing failed") {
    super(message);
  }
}

export class InvalidInputError extends DomainError {
  readonly code = "INVALID_INPUT";
  readonly httpStatus = 400;

  constructor(message = "Invalid input") {
    super(message);
  }
}

export class ParsingTimeoutError extends DomainError {
  readonly code = "PARSING_TIMEOUT";
  readonly httpStatus = 408;

  constructor(message = "Parsing timed out") {
    super(message);
  }
}

export class ParsingJobNotFoundError extends DomainError {
  readonly code = "PARSING_JOB_NOT_FOUND";
  readonly httpStatus = 404;

  constructor(jobId: string) {
    super(`Parsing job not found: ${jobId}`);
  }
}
