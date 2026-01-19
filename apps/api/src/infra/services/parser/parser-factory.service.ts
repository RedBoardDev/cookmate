import { UrlParser } from "@/infra/parsers/url-parser.service";
import { scraperService } from "@/infra/external-services/scraper.service";
import { openaiService } from "@/infra/external-services/openai.service";
import type { ParsingTypeValue } from "@cookmate/domain/shared";
import type { BaseRecipeParser } from "@/infra/parsers/base/base-parser.abstract";

class ParserFactory {
  constructor(
    private readonly _scraperService: typeof scraperService,
    private readonly _openaiService: typeof openaiService
  ) {}

  getParser(type: ParsingTypeValue): BaseRecipeParser {
    switch (type) {
      case "URL":
        return new UrlParser(this._scraperService, this._openaiService);

      // Future parsers:
      // case "IMAGE":
      //   return new ImageParser(ocrService, openaiService);
      // case "TEXT":
      //   return new TextParser(openaiService);

      default:
        throw new Error(`Unknown parser type: ${type}`);
    }
  }
}

export const parserFactory = new ParserFactory(scraperService, openaiService);
