import type { S3PutObjectOutput } from "@/shared/types/s3.types";
import { recipeReader } from "../../infra/prisma/recipe-reader";
import { recipeWriter } from "../../infra/prisma/recipe-writer";
import { generateRecipeImageUploadTargets } from "../../infra/storage/recipe-image-upload";
import type { CreateRecipeCommand } from "./contract";

export interface CreateRecipeIngredientRecordInput {
  name: string;
  quantity: number | null;
  unit: string | null;
  note: string | null;
  optional: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRecipeInstructionRecordInput {
  text: string;
  durationMin: number | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRecipeImageRecordInput {
  storageKey: string;
  name: string;
  mimeType: string;
  size: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRecipeRecordInput {
  id: string;
  name: string;
  description: string | null;
  servings: number;
  yieldUnitLabel: string | null;
  prepTimeMin: number;
  cookTimeMin: number;
  totalTimeMin: number;
  difficulty: string;
  budget: string;
  categories: string[];
  attributes: string[];
  source: string;
  sourceUrl: string | null;
  shortUrl: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  ingredients: CreateRecipeIngredientRecordInput[];
  instructions: CreateRecipeInstructionRecordInput[];
  images: CreateRecipeImageRecordInput[];
}

export interface CreatedRecipeImageRecord {
  id: string;
  storageKey: string;
  name: string;
  mimeType: string;
  size: number;
  order: number;
}

export interface CreatedRecipeRecord {
  id: string;
  shortUrl: string;
  images: CreatedRecipeImageRecord[];
}

export type CreateRecipeDeps = {
  existsByShortUrl: (shortUrl: string) => Promise<boolean>;
  createRecipe: (input: CreateRecipeRecordInput) => Promise<CreatedRecipeRecord>;
  generateUploadTargets: (input: {
    userId: string;
    recipeId: string;
    files: CreateRecipeCommand["images"];
  }) => Promise<S3PutObjectOutput[]>;
};

export const defaultCreateRecipeDeps: CreateRecipeDeps = {
  existsByShortUrl: async (shortUrl) => {
    const recipe = await recipeReader.findFirst({ shortUrl }, { id: true });
    return recipe !== null;
  },
  createRecipe: async (input) => recipeWriter.create(input),
  generateUploadTargets: async ({ userId, recipeId, files }) =>
    generateRecipeImageUploadTargets(
      userId,
      recipeId,
      files.map((file) => ({
        mimeType: file.mimeType,
        originalFilename: file.name,
        fileSize: file.size,
      })),
    ),
};
