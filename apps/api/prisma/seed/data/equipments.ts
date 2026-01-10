export const EQUIPMENTS = [
  // Cookware
  "Casserole",
  "Poele",
  "Sauteuse",
  "Cocotte",
  "Fait-tout",
  "Wok",
  "Poele a crepes",
  "Plat a gratin",

  // Bakeware
  "Moule a gateau",
  "Moule a tarte",
  "Moule a muffins",
  "Plaque de cuisson",
  "Ramequin",

  // Appliances
  "Four",
  "Mixeur plongeant",
  "Robot culinaire",
  "Batteur electrique",
  "Mandoline",
  "Presse-agrumes",
  "Blender",

  // Tools
  "Couteau de chef",
  "Planche a decouper",
  "Fouet",
  "Spatule",
  "Louche",
  "Ecumoire",
  "Passoire",
  "Rape",
  "Rouleau a patisserie",
  "Pinceau de cuisine",
  "Thermometre de cuisine",
  "Balance de cuisine",
  "Econome",
  "Presse-ail",
  "Ciseaux de cuisine",

  // Other
  "Saladier",
  "Bol",
  "Film alimentaire",
  "Papier cuisson",
  "Aluminium",
] as const;

export type EquipmentName = (typeof EQUIPMENTS)[number];
