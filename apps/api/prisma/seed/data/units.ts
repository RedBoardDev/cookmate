export const UNITS = [
  // Volume (metric)
  { name: "millilitre", abbreviation: "ml" },
  { name: "centilitre", abbreviation: "cl" },
  { name: "litre", abbreviation: "L" },

  // Volume (cooking)
  { name: "cuillere a cafe", abbreviation: "c.c." },
  { name: "cuillere a soupe", abbreviation: "c.s." },
  { name: "tasse", abbreviation: "tasse" },
  { name: "verre", abbreviation: "verre" },

  // Weight
  { name: "gramme", abbreviation: "g" },
  { name: "kilogramme", abbreviation: "kg" },

  // Count
  { name: "piece", abbreviation: "pc" },
  { name: "tranche", abbreviation: "tr" },
  { name: "gousse", abbreviation: "gousse" },
  { name: "brin", abbreviation: "brin" },
  { name: "feuille", abbreviation: "feuille" },
  { name: "pincee", abbreviation: "pincee" },
  { name: "bouquet", abbreviation: "bouquet" },
] as const;

export type UnitData = (typeof UNITS)[number];
