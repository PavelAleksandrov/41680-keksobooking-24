export function prepareAdverts(data) {
  const similarAds = [];
  for (const item of data) {
    similarAds.push({
      author: {
        avatar: item.author.avatar,
      },
      offer: {
        title: item.offer.title,
        address: item.offer.address,
        price: item.offer.price,
        type: item.offer.type,
        rooms: item.offer.rooms,
        guests: item.offer.guests,
        checkin: item.offer.checkin,
        checkout: item.offer.checkout,
        features: item.offer.features,
        description: item.offer.description,
        photos: item.offer.photos,
      },
      location: {
        lat: math.round(item.location.lat, 5),
        lng: math.round(item.location.lng, 5),
      },
    });
  }
  return similarAds;
}
