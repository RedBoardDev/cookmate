import type { CollectionEntity } from "@cookmate/domain/collection";
import type { CollectionSnapshot } from "@cookmate/domain/collection";

export interface CollectionAggregateProps {
  collection: CollectionEntity;
  recipeCount: number;
}

export interface CollectionAggregateSnapshot {
  collection: CollectionSnapshot;
  recipeCount: number;
}

export class CollectionAggregate {
  private readonly _collection: CollectionEntity;
  private readonly _recipeCount: number;

  private constructor(props: CollectionAggregateProps) {
    this._collection = props.collection;
    this._recipeCount = props.recipeCount;
  }

  static create(props: CollectionAggregateProps): CollectionAggregate {
    return new CollectionAggregate(props);
  }

  get id(): string {
    return this._collection.id;
  }

  get collection(): CollectionEntity {
    return this._collection;
  }

  get recipeCount(): number {
    return this._recipeCount;
  }

  toSnapshot(): CollectionAggregateSnapshot {
    return {
      collection: this._collection.toSnapshot(),
      recipeCount: this._recipeCount
    };
  }
}
