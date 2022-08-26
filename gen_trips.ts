import jscheck from "jscheck";

const jsc = jscheck();

const TOKEN_PER_TITLE = 5;

const IMAGES = [
  "https://upload.wikimedia.org/wikipedia/commons/b/b6/Voringsfossen_waterfall_at_Eidfjord%2C_Norway.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/46/Geirangerfjord_.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/19/A_view_from_Riksveg_55_at_Sognefjellet.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b0/Sakris%C3%B8y.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/9a/Early_Morning_at_Reine%2C_Lofoten%2C_Norway.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/2/24/Mount_Sm%C3%A5tindan_and_lake_Stor-Kongsvatnet_seen_from_Tjeldbergtind_-_Svolv%C3%A6r%2C_Lofoten%2C_Norway_2019-08-12.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/5/53/Bod%C3%B8_havn_3.JPG"
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

interface Trip {
  title: string,
  image: string,
  n_country: number,
  n_day: number,
  offset: number,
  rating: number
}
