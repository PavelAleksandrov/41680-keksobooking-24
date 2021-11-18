import { generateAdvertPins } from './map.js';
import { debounce } from './utils/debounce.js';
import { round } from './utils/round.js';

const similarAds = [];
const filtersState = {
  'housing-type': 'any',
  'housing-price': 'any',
  'housing-rooms': 'any',
  'housing-guests': 'any',
  'features': [],
};

export function change(type, value) {
  if (type === 'features') {
    const i = filtersState.features.findIndex((item) => item === value);
    if (i >= 0 && filtersState.features[i] === value) {
      filtersState.features.splice(i, 1);
    } else {
      filtersState.features.push(value);
    }
  } else {
    filtersState[type] = value;
  }
  set();
}

export function prepareAdverts(data) {
  for (let i = 0; i < data.length; i++) {
    similarAds.push({
      id: i,
      author: {
        avatar: data[i].author.avatar,
      },
      offer: {
        title: data[i].offer.title,
        address: data[i].offer.address,
        price: data[i].offer.price,
        type: data[i].offer.type,
        rooms: data[i].offer.rooms,
        guests: data[i].offer.guests,
        checkin: data[i].offer.checkin,
        checkout: data[i].offer.checkout,
        features: data[i].offer.features,
        description: data[i].offer.description,
        photos: data[i].offer.photos,
      },
      location: {
        lat: round(data[i].location.lat, 5),
        lng: round(data[i].location.lng, 5),
      },
    });
  }
  return similarAds;
}

function set() {
  const mapAds = new Map();
  const ads = [];
  for (const item of similarAds) {
    mainloop: for (let i = 0; i < Object.keys(filtersState).length; i++) {
      if (item.offer.type !== filtersState['housing-type'] && filtersState['housing-type'] !== 'any') {
        continue;
      }
      if (filtersState['housing-price'] !== 'any') {
        switch (filtersState['housing-price']) {
          case 'low':
            if (item.offer.price > 10000) {
              continue;
            }
            break;
          case 'middle':
            if (item.offer.price < 10000 || item.offer.price > 50000) {
              continue;
            }
            break;
          case 'high':
            if (item.offer.price < 50000) {
              continue;
            }
            break;
        }
      }
      if (item.offer.rooms !== +filtersState['housing-rooms'] && filtersState['housing-rooms'] !== 'any') {
        continue;
      }
      if (item.offer.guests !== +filtersState['housing-guests'] && filtersState['housing-guests'] !== 'any') {
        continue;
      }
      if (filtersState['features'] !== 'any') {
        for (const feature of filtersState['features']) {
          if (!item.offer.features) {
            continue mainloop;
          }
          if (!item.offer.features.includes(feature)) {
            continue mainloop;
          }
        }
      }
      mapAds.set(item.id, item);
    }
  }
  for (const advert of mapAds.values()) {
    ads.push(advert);
  }
  debounce(generateAdvertPins.bind(this, ads))();
}
