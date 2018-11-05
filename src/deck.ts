import Card from './card';
import CardType from './card-type';

const Deck = [
  new Card(CardType.GOLD, 1, '1O'),
  new Card(CardType.GOLD, 2, '2O'),
  new Card(CardType.GOLD, 3, '3O'),
  new Card(CardType.GOLD, 4, '4O'),
  new Card(CardType.GOLD, 5, '5O'),
  new Card(CardType.GOLD, 6, '6O'),
  new Card(CardType.GOLD, 7, '7O'),
  new Card(CardType.GOLD, 8, '10O'),
  new Card(CardType.GOLD, 9, '11O'),
  new Card(CardType.GOLD, 10, '12O'),
  new Card(CardType.CLUBS, 1, '1B'),
  new Card(CardType.CLUBS, 2, '2B'),
  new Card(CardType.CLUBS, 3, '3B'),
  new Card(CardType.CLUBS, 4, '4B'),
  new Card(CardType.CLUBS, 5, '5B'),
  new Card(CardType.CLUBS, 6, '6B'),
  new Card(CardType.CLUBS, 7, '7B'),
  new Card(CardType.CLUBS, 8, '10B'),
  new Card(CardType.CLUBS, 9, '11B'),
  new Card(CardType.CLUBS, 10, '12B'),
  new Card(CardType.CUPS, 1, '1C'),
  new Card(CardType.CUPS, 2, '2C'),
  new Card(CardType.CUPS, 3, '3C'),
  new Card(CardType.CUPS, 4, '4C'),
  new Card(CardType.CUPS, 5, '5C'),
  new Card(CardType.CUPS, 6, '6C'),
  new Card(CardType.CUPS, 7, '7C'),
  new Card(CardType.CUPS, 8, '10C'),
  new Card(CardType.CUPS, 9, '11C'),
  new Card(CardType.CUPS, 10, '12C'),
  new Card(CardType.SWORDS, 1, '1E'),
  new Card(CardType.SWORDS, 2, '2E'),
  new Card(CardType.SWORDS, 3, '3E'),
  new Card(CardType.SWORDS, 4, '4E'),
  new Card(CardType.SWORDS, 5, '5E'),
  new Card(CardType.SWORDS, 6, '6E'),
  new Card(CardType.SWORDS, 7, '7E'),
  new Card(CardType.SWORDS, 8, '10E'),
  new Card(CardType.SWORDS, 9, '11E'),
  new Card(CardType.SWORDS, 10, '12E'),
];

export const OneOfGold = Deck[0];
export const TwoOfGold = Deck[1];
export const ThreeOfGold = Deck[2];
export const FourOfGold = Deck[3];
export const FiveOfGold = Deck[4];
export const SixOfGold = Deck[5];
export const SevenOfGold = Deck[6];
export const SotaOfGold = Deck[7];
export const ElevenOfGold = Deck[8];
export const TwelveOfGold = Deck[9];

export const AllGold = Deck.slice(0, 9);

export const OneOfClubs = Deck[10];
export const TwoOfClubs = Deck[11];
export const ThreeOfClubs = Deck[12];
export const FourOfClubs = Deck[13];
export const FiveOfClubs = Deck[14];
export const SixOfClubs = Deck[15];
export const SevenOfClubs = Deck[16];
export const SotaOfClubs = Deck[17];
export const ElevenOfClubs = Deck[18];
export const TwelveOfClubs = Deck[19];

export const AllClubs = Deck.slice(10, 19);

export const OneOfCups = Deck[20];
export const TwoOfCups = Deck[21];
export const ThreeOfCups = Deck[22];
export const FourOfCups = Deck[23];
export const FiveOfCups = Deck[24];
export const SixOfCups = Deck[25];
export const SevenOfCups = Deck[26];
export const SotaOfCups = Deck[27];
export const ElevenOfCups = Deck[28];
export const TwelveOfCups = Deck[29];

export const AllCups = Deck.slice(20, 29);

export const OneOfSwords = Deck[30];
export const TwoOfSwords = Deck[31];
export const ThreeOfSwords = Deck[32];
export const FourOfSwords = Deck[33];
export const FiveOfSwords = Deck[34];
export const SixOfSwords = Deck[35];
export const SevenOfSwords = Deck[36];
export const SotaOfSwords = Deck[37];
export const ElevenOfSwords = Deck[38];
export const TwelveOfSwords = Deck[39];

export const AllSwords = Deck.slice(30, 39);

export default Deck;
