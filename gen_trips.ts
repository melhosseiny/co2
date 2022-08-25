import jscheck from "jscheck";

const jsc = jscheck();

const TOKEN_PER_TITLE = 5;

const IMAGES = [
  "https://upload.wikimedia.org/wikipedia/commons/b/b6/Voringsfossen_waterfall_at_Eidfjord%2C_Norway.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/46/Geirangerfjord_.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/19/A_view_from_Riksveg_55_at_Sognefjellet.jpg"
]

export function gen_trips(how_many: number): Trip[] {
  const title = () => Array(TOKEN_PER_TITLE).fill('').map(i => jsc.string(jsc.integer(1, 8), jsc.character("aeiou"))()).join(' ');
  const image = () => jsc.wun_of(IMAGES)();
  const countries = () => jsc.integer(1,10)();
  const days = () => jsc.integer(1,365)();
  const offset = () => Number((jsc.number(10)()).toFixed(2));
  const rating = () => Number((jsc.number(5)()).toFixed(1));
  const trip = () => ({
    title: title(),
    image: image(),
    countries: countries(),
    days: days(),
    offset: offset(),
    rating: rating()
  });
  const trips = Array(how_many).fill(undefined).map(i => trip());

  return trips;
}

interface Trip {
  title: string,
  image: string,
  countries: number,
  days: number,
  offset: number,
  rating: number
}
