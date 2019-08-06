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
  },
  _intrinsicSpaceDistributorHelper = (tracks, totalSpaceUsed, containerSize) => {
    let freeSpace,
      spacePerIntrinsicTrack,
      i,
      len,
      frozenTrack = 0,
      minMaxTracks,
      growthLimit,
      baseSize;
      
    if (!tracks.length) {
      return;
    }
    minMaxTracks = tracks.filter(track => track.type === 'minmax' && track.growthLimit !== Infinity);
    freeSpace = containerSize - totalSpaceUsed;
    
    minMaxTracks.sort(function (a, b) {
      let gap1 = a.growthLimit - a.baseSize,
        gap2 = b.growthLimit - b.baseSize;
      
      return gap1 - gap2;
    });
    
    len = minMaxTracks.length;
    while (frozenTrack < len && freeSpace) {
      spacePerIntrinsicTrack = freeSpace / ((minMaxTracks.length - frozenTrack) || 1);
      /**
       * @todo: remove the frozen tracks.
       */
      for (i = 0, len = minMaxTracks.length; i <  len; i++) {
        growthLimit = minMaxTracks[i].growthLimit;
        
        baseSize = Math.min(spacePerIntrinsicTrack + minMaxTracks[i].baseSize, growthLimit);
        freeSpace -= (baseSize - minMaxTracks[i].baseSize);
        minMaxTracks[i].baseSize = baseSize;

        if (growthLimit === baseSize && !minMaxTracks[i].frozen) {
          minMaxTracks[i].frozen = true;
          frozenTrack++;
        }
      }
    }

    tracks = tracks.filter(track => (track.type === 'minmax' && track.growthLimit === Infinity) || track.type !== 'minmax');
    spacePerIntrinsicTrack = freeSpace / tracks.length;

    tracks.forEach(track => track.baseSize += spacePerIntrinsicTrack);
  };

class TrackResolver {
  constructor (tracks = [], items = [], containerSize = 600) {
    this.clear();

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
    case 'containerSize': 
      this.props[key] = isNaN(+info) ? 0 : +info;
    }
    return this;
  }

  get (key) {
    return this.props[key];
  }

  _initTrackSize (_tracks) {
    let tracks = _tracks || this.props.tracks || [],
      config = this._config,
      trackAr = [{}],
      i,
      len,
      size,
      type,
      multiplier,
      baseSize,
      growthLimit;

    config.frTracks = [];
    config.intrinsicTracks = [];

    for (i = 1, len = tracks.length; i < len; i++) {
      size = tracks[i].size;

      multiplier = 1;
      if (Array.isArray(size)) {
        baseSize = +size[0] || 0;

        if (size[1].indexOf('fr') > 0 || size[0].indexOf('fr') > 0) {
          growthLimit = Infinity;
          config.frTracks.push(i);
          type = 'minmax';
        } else if (size[1] === 'auto' || size[0] === 'auto') {
          growthLimit = Infinity;
          config.intrinsicTracks.push(i);
          type = 'minmax';
        } else if (!isNaN(+size[0]) && !isNaN(+size[1])) {
          growthLimit = Math.max(+size[0], +size[1]);
          baseSize = Math.min(+size[0], +size[1]);
          config.intrinsicTracks.push(i);
          type = 'minmax';
        }
      } else if (!isNaN(+size)) {
        baseSize = growthLimit = +size;
        type = 'fixed';
      } else if (size.indexOf('fr') > 0) {
        baseSize = 0;
        growthLimit = Infinity;
        config.frTracks.push(i);
        type = 'flex';
        multiplier = getMultiplierOfFr(size);
      } else {
        baseSize = 0;
        growthLimit = Infinity;
        type = 'intrinsic';
        config.intrinsicTracks.push(i);
      }

      trackAr.push({
        ...tracks[i],
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
      config = this._config,
      sanitizedItems = [],
      nonSpanningItemStartIndex,
      item,
      validItems = 0,
      i,
      len;

    for (i = 0, len = items.length; i < len; i++) {
      if (isNaN(items[i].start) || isNaN(items[i].end)) {
        config.autoFlow.push(items[i]);
        continue;
      }
      sanitizedItems.push({...items[i]});
      
      item = sanitizedItems[validItems];
      validItems++;

      item.size = isNaN(item.size) ? this._getParentSize(item) : +item.size;
    }

    sanitizedItems.sort(function (a, b) {
      let gap1 = a.end - a.start,
        gap2 = b.end - b.start;

      if (gap1 === gap2) {
        return a.start - b.start;
      } else return gap1 - gap2;
    });

    for (i = 0, nonSpanningItemStartIndex = len = sanitizedItems.length; i < len; i++) {
      if (sanitizedItems[i].end - sanitizedItems[i].start > 1) {
        nonSpanningItemStartIndex = i;
        break;
      }
    }

    this._config.nonSpanningItemStartIndex = nonSpanningItemStartIndex;

    return (this._config.sanitizedItems = sanitizedItems);
  }

  _getParentSize (item) {
    let { sanitizedTracks } = this._config,
      parentTracks,
      widthOfParentTracks = 0;

    parentTracks = sanitizedTracks.filter(track => (track.start >= item.start && track.end <= item.end));

    parentTracks.forEach(track => widthOfParentTracks += track.baseSize);

    return (widthOfParentTracks || 0);
  }

  resolveTracks () {
    this._placeNonSpanningItems()
      ._placeSpanningItems()
      ._distributeFreeSpace();

    return this._config.sanitizedTracks;
  }

  _placeNonSpanningItems () {
    let { sanitizedItems, sanitizedTracks, nonSpanningItemStartIndex } = this._config,
      nonSpanningItems = sanitizedItems.slice(0, nonSpanningItemStartIndex),
      track,
      trackIndex;

    nonSpanningItems.forEach(item => {
      trackIndex = item.start;
      track = sanitizedTracks[trackIndex];

      if (track.type !== 'fixed') {
        track.baseSize = Math.max(track.baseSize, item.size);
        track.growthLimit = Math.max(track.growthLimit, track.baseSize);
      }
    });

    return this;
  }

  _placeSpanningItems () {
    let { sanitizedItems, sanitizedTracks, nonSpanningItemStartIndex, frTracks } = this._config,
      spanningItems = sanitizedItems.slice(nonSpanningItemStartIndex),
      trackSizedp = [0],
      sizeConsumed,
      sizeLeft,
      sizePerTrack,
      availableTracks,
      hasFrTrack,
      i,
      len;

    if (!spanningItems.length) return this;

    for (i = 1, len = sanitizedTracks.length; i < len; i++) {
      trackSizedp[i] = trackSizedp[i - 1] + (sanitizedTracks[i].baseSize || 0);
    }

    spanningItems.forEach(item => {
      sizeConsumed = trackSizedp[item.end - 1] - trackSizedp[item.start - 1];
      sizeLeft = Math.max(0, item.size - sizeConsumed);

      if (!sizeLeft) return;

      for (i = item.start, hasFrTrack = false, availableTracks = 0; i < item.end; i++) {
        if (frTracks.indexOf(i) >= 0) {
          hasFrTrack = true;
        }
        if (sanitizedTracks[i].type !== 'fixed') {
          availableTracks++;
        }
      }

      if (!availableTracks || hasFrTrack) return;

      sizePerTrack = sizeLeft / availableTracks;
      for (i = item.start; i < item.end; i++) {
        if (sanitizedTracks[i].type !== 'fixed') {
          sanitizedTracks[i].baseSize += sizePerTrack;
        }
      }
    });
    return this;
  }

  _distributeFreeSpace () {
    let { frTracks, intrinsicTracks, sanitizedTracks } = this._config,
      { containerSize } = this.props,
      totalSpaceUsed = 0;

    sanitizedTracks.forEach(track => totalSpaceUsed += (track.baseSize || 0));

    if (totalSpaceUsed < containerSize) {
      if (frTracks.length) {
        frTracks.forEach((trackId, index) => {frTracks[index] = sanitizedTracks[trackId];});
        frTracks.forEach(track => totalSpaceUsed -= track.baseSize);
        _frSpaceDistributorHelper(frTracks, totalSpaceUsed, containerSize);
      } else if (intrinsicTracks.length) {
        intrinsicTracks.forEach((trackId, index) => {intrinsicTracks[index] = sanitizedTracks[trackId];});
        _intrinsicSpaceDistributorHelper(intrinsicTracks, totalSpaceUsed, containerSize);
      }
    }
    return this;
  }

  clear () {
    this.props = {};
    this._config = {
      frTracks: [],
      intrinsicTracks: [],
      autoFlow: []
    };

    return this;
  }
}

export default TrackResolver;
