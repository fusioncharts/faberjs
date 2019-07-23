const getMultiplierOfFr = size => +size.replace(/fr/, ''),
  _frSpaceDistributorHelper = (tracks, totalSpaceUsed, containerSize) => {
    let freeSpace,
      spacePerFrTrack,
      eligibleTracks,
      totalFrTrackRatio = 0;
      
    if (!tracks.length) {
      return;
    }

    tracks.forEach(track => totalFrTrackRatio += track.multiplier);

    freeSpace = containerSize - totalSpaceUsed;
    spacePerFrTrack = freeSpace / totalFrTrackRatio;
    
    eligibleTracks = tracks.filter(track => track.baseSize <= track.multiplier * spacePerFrTrack);

    if (eligibleTracks.length < tracks.length) {
      tracks.filter(track => track.baseSize > track.multiplier * spacePerFrTrack).forEach(track => totalSpaceUsed += track.baseSize);
      return _frSpaceDistributorHelper(eligibleTracks, totalSpaceUsed, containerSize);
    } else {
      eligibleTracks.forEach(track => track.baseSize = track.multiplier * spacePerFrTrack);
    }
  };

class TrackResolver {
  constructor (tracks = [], items = [], containerSize = 600) {
    this.props = {};
    this._config = {
      frTracks: []
    };

    this.set('tracks', tracks);
    this.set('items', items);
    this.set('containerSize', containerSize);

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

  get (key) {
    return this.props[key];
  }

  _initTrackSize (_tracks) {
    let tracks = _tracks || this.props.tracks || [],
      config = this._config,
      trackAr = [],
      i,
      len,
      size,
      type,
      multiplier,
      baseSize,
      growthLimit;

    config.frTracks = [];

    for (i = 0, len = tracks.length; i < len; i++) {
      size = tracks[i].size;

      multiplier = 1;
      if (!isNaN(+size)) {
        baseSize = growthLimit = +size;
        type = 'fixed';
      } else if (size.indexOf('fr') > 0) {
        baseSize = growthLimit = 0;
        config.frTracks.push(i);
        type = 'flex';
        multiplier = getMultiplierOfFr(size);
      } else {
        baseSize = 0;
        growthLimit = Infinity;
        type = 'intrinsic';
      }

      trackAr.push({
        size,
        type,
        multiplier,
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

  resolveTracks () {
    this._placeNonSpanningItems()
      ._placeSpanningItems()
      ._distributeFreeSpace();

    return this._config.sanitizedTracks;
  }

  _placeNonSpanningItems () {
    let { sanitizedItems, sanitizedTracks } = this._config,
      nonSpanningItems = sanitizedItems.filter(item => (item.end - item.start) === 1),
      track,
      trackIndex;

    nonSpanningItems.forEach(item => {
      trackIndex = item.start - 1;
      track = sanitizedTracks[trackIndex];

      if (track.type !== 'fixed') {
        track.baseSize = Math.max(track.baseSize, item.size);
        track.growthLimit = Math.max(track.growthLimit, track.baseSize);
      }
    });

    return this;
  }

  _placeSpanningItems () {
    return this;
  }

  _distributeFreeSpace () {
    let { frTracks, sanitizedTracks } = this._config,
      { containerSize } = this.props,
      totalSpaceUsed = 0;

    sanitizedTracks.forEach(track => totalSpaceUsed += track.baseSize);

    if (totalSpaceUsed < containerSize) {
      if (frTracks.length) {
        frTracks.forEach((trackId, index) => {frTracks[index] = sanitizedTracks[trackId];});
        frTracks.forEach(track => totalSpaceUsed -= track.baseSize);
        _frSpaceDistributorHelper(frTracks, totalSpaceUsed, containerSize);
      }
    }
    return this;
  }
}

export default TrackResolver;
