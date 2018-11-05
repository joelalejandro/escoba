import { EventEmitter, ListenerFn } from 'eventemitter3';

import Card from "./card";
import CardType from './card-type';
import Game from './game';
import { sumKeyValue, sumValues } from './math';

export default class Player {
  public static readonly FIRST_CARD = 0;
  public static readonly SECOND_CARD = 1;
  public static readonly THIRD_CARD = 2;
  public static readonly RECEIVED_CARD = 3;

  public name: string;
  public sweepedCards: Card[] = [];
  public sweeperCards: Card[] = [];
  private cards: Card[] = [];
  private events = new EventEmitter();

  public constructor(name: string) {
    this.name = name;
  }

  public join(game: Game) {
    game.registerPlayer(this);
    this.events.emit('join');
  }

  public canReceiveCard() {
    return this.cards.length < 4;
  }

  public mustDiscard() {
    return this.cards.length === 4;
  }

  public canDiscard() {
    return this.cards.length > 0;
  }

  public receiveCard(card: Card) {
    this.cards.push(card);
    this.events.emit('card:receive', card);
  }

  public sweepCard(card: Card) {
    this.sweepedCards.push(card);
  }

  public getSweepedCardsScore(): number {
    let score = 0;

    score += sumValues(this.sweepedCards.map(
      (card) => card.type === CardType.GOLD && [1, 7, 12].includes(card.value) ? 1 : 0,
    ));

    score += this.sweeperCards.length;

    return score;
  }

  public pickUpCards(game: Game, handCard: Card, ...cards: Card[]) {
    if (sumKeyValue(cards, 'value') !== 15) {
      return false;
    }

    cards.forEach((card) => game.removeCardFromTable(card, this));

    if (game.table.length === 0) {
      this.sweeperCards.push(handCard);
    }
  }

  public putCardInTable(index: number) {
    const pickedCard = this.cards[index];
    this.cards = this.cards.splice(index, 1);
    this.events.emit('card:putInTable', pickedCard);
  }

  public onJoin(callback: ListenerFn) {
    this.events.on('join', callback);
    return this;
  }

  public onCardReceive(callback: ListenerFn) {
    this.events.on('card:receive', callback);
  }

  public onCardPutInTable(callback: ListenerFn) {
    this.events.on('card:putInTable', callback);
  }
}
