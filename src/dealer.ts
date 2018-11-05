import { EventEmitter, ListenerFn } from 'eventemitter3';
import Card from "./card";
import Game from './game';
import { randomSequence } from './math';
import Player from "./player";

export default class Dealer {
  private cards: Card[];
  private events = new EventEmitter();

  public constructor(cards: Card[]) {
    this.cards = cards;
  }

  public deal(game: Game) {
    for (let cardCount = 1; cardCount <= 3; cardCount += 1) {
      game.forEachPlayer((player) => {
        if (player.canReceiveCard()) {
          player.receiveCard(this.cards.shift());
        }
      });
    }

    if (game.getRound() === 1) {
      this.events.emit('deal:first');
    }

    this.events.emit('deal', this.cards);
  }

  public putCardsInTable(game) {
    for (let cardCount = 1; cardCount <= 4; cardCount += 1) {
      game.putCardInTable(this.cards.shift());
    }
  }

  public join(game: Game) {
    game.registerDealer(this);
    this.onFirstDeal(this.putCardsInTable.bind(this, game));
  }

  public shuffle() {
    const { length } = this.cards;
    const sequence = randomSequence(length);
    const shuffleMap: { [index: string]: Card } = {};

    for (const { random, index } of sequence) {
      shuffleMap[random.toString()] = this.cards[index];
    }

    const shuffledIndexes = Object.keys(shuffleMap).sort();

    this.cards = shuffledIndexes.map((index) => shuffleMap[index]);
    this.events.emit('shuffle');
  }

  public onShuffle(callback: ListenerFn) {
    this.events.on('shuffle', callback);
    return this;
  }

  public onDeal(callback: ListenerFn) {
    this.events.on('deal', callback);
    return this;
  }

  public onFirstDeal(callback: ListenerFn) {
    this.events.once('deal:first', callback);
    return this;
  }

  public onNextDeal(callback: ListenerFn) {
    this.events.once('deal', callback);
    return this;
  }
}
