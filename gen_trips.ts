import jscheck from "jscheck";

const jsc = jscheck();

const TOKEN_PER_TITLE = 5;

const IMAGES = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Reine-3.jpg/800px-Reine-3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Sakris%C3%B8y.jpg/799px-Sakris%C3%B8y.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Ramberg_%28Lofoten%29.jpg/800px-Ramberg_%28Lofoten%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Sildpollneset.jpg/800px-Sildpollneset.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Mount_Sm%C3%A5tindan_and_lake_Stor-Kongsvatnet_seen_from_Tjeldbergtind_-_Svolv%C3%A6r%2C_Lofoten%2C_Norway_2019-08-12.jpg/799px-Mount_Sm%C3%A5tindan_and_lake_Stor-Kongsvatnet_seen_from_Tjeldbergtind_-_Svolv%C3%A6r%2C_Lofoten%2C_Norway_2019-08-12.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Djupfjorden%2C_2010_09.jpg/800px-Djupfjorden%2C_2010_09.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Early_Morning_at_Reine%2C_Lofoten%2C_Norway.jpg/800px-Early_Morning_at_Reine%2C_Lofoten%2C_Norway.jpg"
]

// generate how_many trips with mock data
export function gen_trips(how_many: number): Trip[] {
  const title = () => Array(TOKEN_PER_TITLE).fill('').map(i => jsc.string(jsc.integer(1, 8), jsc.character("aeiou"))()).join(' ');
  const image = () => jsc.wun_of(IMAGES)();
  const countries = () => jsc.integer(1,10)();
  const days = () => jsc.integer(1,365)();
  const offset = () => jsc.integer(10000)(); // kg
  const rating = () => Number((jsc.number(5)()).toFixed(1));
  const trip = () => ({
    title: title(),
    image: image(),
    n_country: countries(),
    n_day: days(),
    offset: offset(),
    rating: rating()
  });
  const trips = Array(how_many).fill(undefined).map(i => trip());

  return trips;
}

export interface Trip {
  title: string,
  image: string,
  n_country: number,
  n_day: number,
  offset: number,
  rating: number
}
