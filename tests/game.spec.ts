import Dealer from "../src/dealer";
import Deck, { ThreeOfSwords } from '../src/deck';
import {
  FourOfCups, SevenOfGold, ThreeOfClubs,
  ElevenOfSwords, OneOfClubs, SotaOfGold,
  FiveOfCups, TwoOfClubs, SevenOfCups,
  ThreeOfGold,
} from '../src/deck';
import Game from "../src/game";
import Player from "../src/player";

const startGame = () => {
  const game = new Game();
  const dealer = new Dealer(Deck);
  const alice = new Player('Alice');
  const bob = new Player('Bob');
  const aliceCards = [];
  const bobCards = [];

  alice.join(game);
  bob.join(game);
  dealer.join(game);
  alice.onCardReceive((card) => aliceCards.push(card.label));
  bob.onCardReceive((card) => bobCards.push(card.label));
  game.onCardPlacedInTable(() => {
    expect(game.table.length <= 4);
  });
  dealer.shuffle();
  dealer.deal(game);

  return { game, dealer, alice, bob, aliceCards, bobCards };
};

describe('Dealer', () => {
  it('should shuffle the cards', async () => {
    const dealer = new Dealer(
      Deck,
    );
    dealer.shuffle();
  });

  it('should deal unique cards for two players and the table', () => {
    const { game, aliceCards, bobCards } = startGame();
    expect(aliceCards).not.toHaveLength(0);
    expect(bobCards).not.toHaveLength(0);
    expect(game.table).not.toHaveLength(0);

    const aliceCardsCount = aliceCards.length;
    const bobCardsCount = bobCards.length;
    const gameTableCount = game.table.length;

    const uniqueness = new Set();
    const dealtCards = aliceCards.length + bobCards.length + game.table.length;
    aliceCards.forEach((card) => uniqueness.add(card));
    bobCards.forEach((card) => uniqueness.add(card));
    game.table.forEach((card) => uniqueness.add(card.label));
    expect(uniqueness.size).toEqual(dealtCards);

    expect(aliceCardsCount).toEqual(aliceCards.length);
    expect(bobCardsCount).toEqual(aliceCards.length);
    expect(gameTableCount).toEqual(game.table.length);
  });
});

describe('Player', () => {
  it('should be able to sweep cards', () => {
    const game = new Game();
    const dealer = new Dealer([
      FourOfCups, SevenOfGold, ThreeOfClubs,
      ElevenOfSwords, OneOfClubs, SotaOfGold,
      FiveOfCups, TwoOfClubs, SevenOfCups,
      ThreeOfSwords, ThreeOfGold,
    ]);
    const alice = new Player('Alice');
    const bob = new Player('Bob');
    const aliceCards = [];
    const bobCards = [];
    alice.join(game);
    bob.join(game);
    dealer.join(game);
    alice.onCardReceive((card) => aliceCards.push(card.label));
    bob.onCardReceive((card) => bobCards.push(card.label));
    dealer.deal(game);

    game.onCardPlacedInTable((card) => {
      const [combo] = game.playerCanScore(alice, card);
      alice.pickUpCards(game, card, ...combo);
      expect(alice.sweepedCards.length).toBeGreaterThan(0);
    });

    alice.putCardInTable(Player.THIRD_CARD);
  });
});
