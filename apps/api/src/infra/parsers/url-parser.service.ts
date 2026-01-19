import { BaseRecipeParser } from "./base/base-parser.abstract";
import type { ParsedRecipe } from "@cookmate/domain/recipe-parsing";
import { InvalidInputError } from "@cookmate/domain/recipe-parsing";
import type { ScraperService } from "@/infra/external-services/scraper.service";
import type { OpenAIService } from "@/infra/external-services/openai.service";

interface UrlParserInput {
  url: string;
}

export class UrlParser extends BaseRecipeParser {
  constructor(
    private readonly scraperService: ScraperService,
    private readonly openaiService: OpenAIService
  ) {
    super();
  }

  protected async validateInput(input: unknown): Promise<void> {
    if (typeof input !== "object" || input === null) {
      throw new InvalidInputError("Input must be an object");
    }

    const { url } = input as { url?: unknown };

    if (typeof url !== "string") {
      throw new InvalidInputError("URL must be a string");
    }

    // Simple URL validation
    try {
      new URL(url);
    } catch {
      throw new InvalidInputError("Invalid URL format");
    }
  }

  protected async doParse(input: unknown, jobId: string): Promise<ParsedRecipe> {
    const { url } = input as UrlParserInput;

    // Step 1: Fetch page
    this.emitProgress(jobId, "fetching_page", 20);
    const html = await this.scraperService.fetchPage(url);

    // Step 2: Extract content
    this.emitProgress(jobId, "extracting_content", 50);
    // Note: In mock, we pass directly to AI
    // In production, we would extract text from HTML here

    // Step 3: AI processing
    this.emitProgress(jobId, "ai_processing", 70);
    const recipe = await this.openaiService.extractRecipe(html, url);

    // Ensure sourceUrl is set
    recipe.sourceUrl = url;

    return recipe;
  }
}
