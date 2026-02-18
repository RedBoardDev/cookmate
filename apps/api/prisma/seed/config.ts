export type SeedRange = {
  min: number;
  max: number;
};

export type SeedConfig = {
  clean: boolean;
  users: {
    count: number;
    password: string;
  };
  recipesPerUser: SeedRange;
  discoverRecipes: {
    count: number;
  };
  collectionsPerUser: SeedRange;
  content: {
    ingredientsPerRecipe: SeedRange;
    instructionsPerRecipe: SeedRange;
    imagesPerRecipe: SeedRange;
    equipmentsPerRecipe: SeedRange;
  };
  forkedRecipeRatio: number;
};

export const DEFAULT_SEED_CONFIG: SeedConfig = {
  clean: true,
  users: {
    count: 5,
    password: "Cookmate123!",
  },
  recipesPerUser: {
    min: 3,
    max: 8,
  },
  discoverRecipes: {
    count: 15,
  },
  collectionsPerUser: {
    min: 1,
    max: 3,
  },
  content: {
    ingredientsPerRecipe: {
      min: 4,
      max: 10,
    },
    instructionsPerRecipe: {
      min: 3,
      max: 7,
    },
    imagesPerRecipe: {
      min: 0,
      max: 3,
    },
    equipmentsPerRecipe: {
      min: 1,
      max: 4,
    },
  },
  forkedRecipeRatio: 0.2,
};

export type SeedConfigResult = {
  config: SeedConfig;
  showHelp: boolean;
};

type ArgMap = Record<string, string | boolean>;

const toNumber = (value: string | boolean | undefined, fallback: number): number => {
  if (typeof value !== "string") {
    return fallback;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const normalizeRange = (range: SeedRange): SeedRange => {
  if (range.min > range.max) {
    return { min: range.max, max: range.min };
  }
  return range;
};

const parseArgs = (argv: string[]): ArgMap => {
  const args: ArgMap = {};
  for (let i = 0; i < argv.length; i += 1) {
    const raw = argv[i];
    if (!raw) {
      continue;
    }
    if (raw.startsWith("--")) {
      const [key, inlineValue] = raw.slice(2).split("=");
      if (!key) {
        continue;
      }
      if (inlineValue !== undefined) {
        args[key] = inlineValue;
        continue;
      }
      const next = argv[i + 1];
      if (next && !next.startsWith("-")) {
        args[key] = next;
        i += 1;
      } else {
        args[key] = true;
      }
      continue;
    }
    if (raw.startsWith("-")) {
      const key = raw.slice(1);
      if (key) {
        args[key] = true;
      }
    }
  }
  return args;
};

export const getSeedHelp = (): string => `
Seed options:
  --clean            Clean database before seeding (default)
  --no-clean         Skip database cleaning
  --users=NUMBER     Number of users (default ${DEFAULT_SEED_CONFIG.users.count})
  --discover=NUMBER  Number of discover recipes (default ${DEFAULT_SEED_CONFIG.discoverRecipes.count})
  --recipes-min=NUM  Min recipes per user (default ${DEFAULT_SEED_CONFIG.recipesPerUser.min})
  --recipes-max=NUM  Max recipes per user (default ${DEFAULT_SEED_CONFIG.recipesPerUser.max})
  --collections-min=NUM  Min collections per user (default ${DEFAULT_SEED_CONFIG.collectionsPerUser.min})
  --collections-max=NUM  Max collections per user (default ${DEFAULT_SEED_CONFIG.collectionsPerUser.max})
  --help, -h         Show help
`;

export const parseSeedConfig = (argv: string[]): SeedConfigResult => {
  const args = parseArgs(argv);
  const showHelp = args.help === true || args.h === true;

  let clean = DEFAULT_SEED_CONFIG.clean;
  if (args["no-clean"] === true) {
    clean = false;
  } else if (args.clean === true) {
    clean = true;
  }

  const usersCount = toNumber(args.users, DEFAULT_SEED_CONFIG.users.count);
  const discoverCount = toNumber(args.discover ?? args["discover-recipes"], DEFAULT_SEED_CONFIG.discoverRecipes.count);

  const recipesPerUser = normalizeRange({
    min: toNumber(args["recipes-min"], DEFAULT_SEED_CONFIG.recipesPerUser.min),
    max: toNumber(args["recipes-max"], DEFAULT_SEED_CONFIG.recipesPerUser.max),
  });

  const collectionsPerUser = normalizeRange({
    min: toNumber(args["collections-min"], DEFAULT_SEED_CONFIG.collectionsPerUser.min),
    max: toNumber(args["collections-max"], DEFAULT_SEED_CONFIG.collectionsPerUser.max),
  });

  return {
    showHelp,
    config: {
      ...DEFAULT_SEED_CONFIG,
      clean,
      users: {
        ...DEFAULT_SEED_CONFIG.users,
        count: usersCount,
      },
      discoverRecipes: {
        count: discoverCount,
      },
      recipesPerUser,
      collectionsPerUser,
    },
  };
};
