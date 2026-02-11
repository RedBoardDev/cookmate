import type { ParsedRecipe } from "@cookmate/domain/recipe-parsing";
import { parsingEventsGateway } from "@/infra/services/parser/parsing-events-gateway.service";
import { parsingProgressReporter } from "@/infra/services/parser/parsing-progress-reporter.service";

export abstract class BaseRecipeParser {
  /**
   * Template method - called by the orchestrator
   */
  async parse(jobId: string, input: unknown): Promise<ParsedRecipe> {
    try {
      this.emitProgress(jobId, "initializing", 0);

      // Hook: specific validation (overridable)
      await this.validateInput(input);

      // BUSINESS LOGIC - implemented by concrete parsers
      const parsedRecipe = await this.doParse(input, jobId);

      this.emitProgress(jobId, "formatting", 95);

      // Hook: optional post-processing
      await this.postProcess(parsedRecipe);

      this.emitProgress(jobId, "completed", 100);

      return parsedRecipe;
    } catch (error) {
      this.handleError(jobId, error as Error);
      throw error;
    }
  }

  /**
   * TO BE IMPLEMENTED by each concrete parser
   */
  protected abstract doParse(input: unknown, jobId: string): Promise<ParsedRecipe>;

  /**
   * OPTIONAL - hooks with default implementation
   */
  protected async validateInput(_input: unknown): Promise<void> {
    // Override if needed
  }

  protected async postProcess(_recipe: ParsedRecipe): Promise<void> {
    // Override if needed (e.g., cleanup, normalization)
  }

  /**
   * COMMON UTILITIES - used by all parsers
   */
  protected emitProgress(jobId: string, step: string, percent: number): void {
    void parsingProgressReporter.report(jobId, { step, percent });
  }

  protected handleError(jobId: string, error: Error): void {
    parsingEventsGateway.emitError(jobId, {
      code: error.name,
      message: error.message,
    });
  }
}
