import { EventEmitter, ListenerFn } from 'eventemitter3';
import Card from './card';
import Dealer from './dealer';
import { getAllSubsets, sumKeyValue } from './math';
import Player from './player';

export default class Game {
  public table: Card[] = [];
  private round: number = 1;
  private dealer: Dealer;
  private players: Player[] = [];
  private events = new EventEmitter();

  public registerPlayer(player: Player) {
    if (this.players.some(
      (registeredPlayer: Player) => registeredPlayer.name === player.name)
    ) {
      return;
    }

    player.onCardPutInTable((card) => {
      this.putCardInTable(card, player);
    });

    this.players.push(player);
  }

  public getRound() {
    return this.round;
  }

  public registerPlayers(...players: Player[]) {
    players.forEach(this.registerPlayer.bind(this));
  }

  public registerDealer(dealer: Dealer) {
    dealer.onDeal(this.increaseRound.bind(this));
    this.dealer = dealer;
  }

  public forEachPlayer(callback: (player: Player, index: number) => void) {
    this.players.forEach(callback);
  }

  public putCardInTable(card: Card, player?: Player) {
    this.table.push(card);
    this.events.emit('card:placedInTable', card, player);
  }

  public removeCardFromTable(card: Card, player?: Player) {
    this.table = this.table.filter((tableCard) => tableCard.label !== card.label);

    if (player) {
      player.sweepCard(card);
    }
  }

  public playerCanScore(player: Player, card: Card) {
    return getAllSubsets(
      [...new Set(this.table).add(card)],
    ).filter(
      (subset) => subset.includes(card) && sumKeyValue(subset, 'value') === 15,
    );
  }

  public onCardPlacedInTable(callback: ListenerFn) {
    this.events.on('card:placedInTable', callback);
    return this;
  }

  private increaseRound() {
    this.round += 1;
  }
}
