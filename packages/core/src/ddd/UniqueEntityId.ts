import { Identifier } from './Identifier';

export class UniqueEntityID extends Identifier<string> {
  constructor(id?: string) {
    super(id ? id : Math.random().toString(36).substring(2, 15));
  }
}
