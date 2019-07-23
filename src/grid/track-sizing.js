// let _initTracks = [{
//     size: 'auto',
//     start: 1,
//     end: 2
//   }, {
//     size: '1fr',
//     start: 2,
//     end: 3
//   }, {
//     size: 'auto',
//     start: 3,
//     end: 4
//   }],
//   _trackItems = [{
//     start: 1,
//     end: 2,
//     size: 30
//   }, {
//     start: 2,
//     end: 3,
//     size: 30
//   }];

// const getUnfreezedTracks = (tracks, start, end) => {
//   let i,
//     unfreezeTracks = [];

//   for (i = start; i < end; i++) {
//     if (!tracks[i].freeze) {
//       unfreezeTracks.push(tracks[i]);
//     }
//   }
//   return unfreezeTracks;
// };

class TrackResolver {
  constructor (tracks = [], items = []) {
    this.props = {};
    this._config = {
      frTracks: []
    };

    this.set('tracks', tracks);
    this.set('items', items);

    return this;
  }

  set (key, info) {
    this.props[key] = info;

    switch (key) {
    case 'tracks':
      this._initTrackSize(); break;
    case 'items':
      this._initItems(); break;
    }
    return this;
  }

  _initTrackSize (_tracks) {
    let tracks = _tracks || this.props.tracks || [],
      config = this._config,
      trackAr = [],
      i,
      len,
      size,
      freeze,
      baseSize,
      growthLimit;

    for (i = 0, len = tracks.length; i < len; i++) {
      size = tracks[i].size;
      freeze = false;

      if (!isNaN(+size)) {
        baseSize = growthLimit = +size;
        freeze = true;
      } else if (size.indexOf('fr') > 0) {
        baseSize = growthLimit = 0;
        config.frTracks.push(i);
      } else {
        baseSize = 0;
        growthLimit = Infinity;
      }

      trackAr.push({
        size,
        freeze,
        baseSize,
        growthLimit
      });
    }

    return (config.sanitizedTracks = trackAr);
  }

  _initItems (_items) {
    let items = _items || this.props.items || [],
      sanitizedItems = [],
      i,
      len;

    for (i = 0, len = items.length; i < len; i++) {
      sanitizedItems.push({...items[i]});
    }

    sanitizedItems.sort(function (a, b) {
      let gap1 = a.end - a.start,
        gap2 = b.end - b.start;

      if (gap1 === gap2) {
        return a.start < b.start;
      } else return gap1 < gap2;
    });

    return (this._config.sanitizedItems = sanitizedItems);
  }

  _placeNonSpanningItems () {
    let { sanitizedItems, sanitizedTracks } = this._config,
      nonSpanningItems = sanitizedItems.filter(item => (item.end - item.start) === 1),
      track,
      trackIndex;

    nonSpanningItems.forEach(item => {
      trackIndex = item.start - 1;
      track = sanitizedTracks[trackIndex];

      if (!track.freeze) {
        track.baseSize = Math.max(track.baseSize, item.size);
        track.growthLimit = Math.max(track.growthLimit, track.baseSize);
      }
    });
  }
  resolveTracks () {
    this._placeNonSpanningItems();

    // console.log(this._config.sanitizedTracks);
    return this._config.sanitizedTracks;
  }
}

export default TrackResolver;
