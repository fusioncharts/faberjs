const getMultiplierOfFr = size => +size.replace(/fr/, ''),
  /**
   * Helper function to distribute extra space among all the flexible tracks.
   */
  _frSpaceDistributorHelper = (tracks, totalSpaceUsed, containerSize) => {
    let freeSpace,
      spacePerFrTrack,
      eligibleTracks,
      totalFrTrackRatio = 0;

    if (!tracks.length) {
      return;
    }

    tracks.forEach(track => (totalFrTrackRatio += track.multiplier));

    freeSpace = containerSize - totalSpaceUsed;
    spacePerFrTrack = freeSpace / totalFrTrackRatio;

    eligibleTracks = tracks.filter(track => track.baseSize <= track.multiplier * spacePerFrTrack);

    if (eligibleTracks.length < tracks.length) {
      tracks.filter(track => track.baseSize > track.multiplier * spacePerFrTrack).forEach(track => (totalSpaceUsed += track.baseSize));
      return _frSpaceDistributorHelper(eligibleTracks, totalSpaceUsed, containerSize);
    } else {
      eligibleTracks.forEach(track => (track.baseSize = track.multiplier * spacePerFrTrack));
    }
  },
  /**
   * Helper function to distribute extra space among all the intrinsic tracks.
   */
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
      for (i = 0, len = minMaxTracks.length; i < len; i++) {
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

    tracks.forEach(track => (track.baseSize += spacePerIntrinsicTrack));
  };

/**
 * TrackResolver implements the standard track solving algorithm of CSS grid.
 * Refer https://www.w3.org/TR/css-grid-1/#algo-track-sizing
 *
 * @class TrackResolver
 */
class TrackResolver {
  constructor (tracks = [], items = [], containerSize = 600) {
    this.clear();

    this.set('tracks', tracks);
    this.set('items', items);
    this.set('containerSize', containerSize);
    return this;
  }

  /**
   * setter method to set props
   *
   * @param   {string} key
   *          key represents the name by which the value is to be stored in props object.
   * @param   {any} info
   *          info is the information(can be anything) that has to be stored against the key.
   * @returns {TrackResolver}
   *          Reference of the class instance.
   * @memberof TrackResolver
   */
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

  /**
   * Getter method to fetch the props
   *
   * @param   {string} key
   *          key of the value which has to be fetched.
   * @returns {any}
   *          alue corresponding to the key in props object
   * @memberof TrackResolver
   */
  get (key) {
    return this.props[key];
  }

  /**
   * Initializes the tracks. Both rows and columns in grid are tracks in TrackResolver.
   * Each track is assigned a baseSize and growthLimit. BaseSize is the minimum size that a track can take,
   * while growthLimit is the max size.
   *
   * Terminology:
   * FrTracks: Tracks which have a size definition in terms of fr(free space)
   * Intrinsic Tracks: Tracks which have a size definition of auto.
   *
   * @param   {Array} _tracks
   *          Array containing information about the tracks.
   * @returns {Array}
   *          Array of sanitized tracks. A sanitized track consists of the following information
   *          {
   *              type: minmax | fixed | flex | intrinsic
   *                    minmax: track has size definition in minmax format
   *                    fixed: a fixed numeric value is provided as size definition
   *                    flex: size definition is provided in terms of fr
   *                    intrinsic: auto size definition
   *              multiplier: Prefix of fr(2 in case of 2fr). default 1.
   *              baseSize: lower size limit of track.
   *              growthLimit: upper size limit of track.
   *          }
   * @memberof TrackResolver
   */
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

  /**
   * The size of grid items are sanitized in this method. In case the items do not have a valid size, they
   * take up size of the tracks
   *
   * @param   {Array} _items
   *          Array of grid items
   * @returns {Array}
   *          Array of items where each item has valid size
   * @memberof TrackResolver
   */
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
      } else { return gap1 - gap2; }
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

  /**
   * If any grid item do not have a valid size, then it takes up the size of the track.
   *
   * @param   {Object} item
   *          The item which do not have a proper size and will take up the size of the track.
   * @returns {number}
   *          size of the track(s) which will be assigned to the grid item.
   * @memberof TrackResolver
   */
  _getParentSize (item) {
    let { sanitizedTracks } = this._config,
      parentTracks,
      widthOfParentTracks = 0;

    parentTracks = sanitizedTracks.filter(track => (track.start >= item.start && track.end <= item.end));

    parentTracks.forEach(track => (widthOfParentTracks += track.baseSize));

    return (widthOfParentTracks || 0);
  }

  /**
   * resolveTracks method is called to resolve the tracks.
   *
   * Terminology:
   * Non-spanning items - items which is contained in a single track.
   * Spanning items -  items which is spread across multiple tracks.
   *
   * 1. At first all the non-spanning items are placed. The tracks containing non-spanning gets a minimum size.
   * 2. Then the spanning items are placed. If total size of all the tracks over which the spanning items are spread is less than
   *  the size of the spanning items, then the extra space required by the item is accomodated equally by the non-fixed tracks.
   * 3. Afer all the items are placed, if any free space remains, they get distributed among the non-fixed tracks.
   *
   * @returns {Array}
   *          Array of objects where each object is a track with resolved size.
   * @memberof TrackResolver
   */
  resolveTracks () {
    this._placeNonSpanningItems()
      ._placeSpanningItems()
      ._distributeFreeSpace();

    return this._config.sanitizedTracks;
  }

  /**
   * Placing a non-spanning item. After placing the item if the containing track has a non-fixed size, it is increased to
   * accomodate the item.
   *
   * @returns {TrackResolver}
   *          Reference of the class instance.
   * @memberof TrackResolver
   */
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

  /**
   * Place the non-spanning items. If the total size of all tracks on which the item is spread is less than
   * the size of the item, then the extra size required is accomodated by equally increasing the size of
   * all the non-fixed containing tracks.
   *
   * @returns {TrackResolver}
   *          Reference of the class instance.
   * @memberof TrackResolver
   */
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

  /**
   * After all the items are placed and if any free space remains, it is distributed among the tracks.
   * Distribution strategy depends on the track configurations.
   * If there are tracks with flexible size
   * definition(fr), then all the free space is allocated to those tracks.
   * If there are no tracks with flexible size definiton, then the free space is distributed
   * evenly among the intrinsic tracks.
   * If all the tracks are fixed(ie, have fixed size), then the free space is not distributed.
   *
   * @returns {TrackResolver}
   *          Reference of the class instance.
   * @memberof TrackResolver
   */
  _distributeFreeSpace () {
    let { frTracks, intrinsicTracks, sanitizedTracks } = this._config,
      { containerSize } = this.props,
      totalSpaceUsed = 0;

    sanitizedTracks.forEach(track => (totalSpaceUsed += (track.baseSize || 0)));

    if (totalSpaceUsed < containerSize) {
      if (frTracks.length) {
        frTracks.forEach((trackId, index) => { frTracks[index] = sanitizedTracks[trackId]; });
        frTracks.forEach(track => (totalSpaceUsed -= track.baseSize));
        _frSpaceDistributorHelper(frTracks, totalSpaceUsed, containerSize);
      } else if (intrinsicTracks.length) {
        intrinsicTracks.forEach((trackId, index) => { intrinsicTracks[index] = sanitizedTracks[trackId]; });
        _intrinsicSpaceDistributorHelper(intrinsicTracks, totalSpaceUsed, containerSize);
      }
    }
    return this;
  }

  /**
   * clears the props and configuration of TrackResolver. This method is called before using
   * TrackResolver with different set of input.
   *
   * @returns {TrackResolver}
   *          Reference of the class instance.
   * @memberof TrackResolver
   */
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
