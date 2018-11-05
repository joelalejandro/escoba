import CardType from "./card-type";

export default class Card {
  public type: CardType;
  public value: number;
  public label: string;

  public constructor(type: CardType, value: number, label: string) {
    this.type = type;
    this.value = value;
    this.label = label;
  }
}
