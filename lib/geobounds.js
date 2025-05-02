import insidePolygon from 'point-in-polygon';

function between(a, b, c) {
  return a <= b && b <= c;
}

function insideRectangle(ll, rect) {
  const sw = rect[0];
  const ne = rect[1];
  return between(sw[0], ll[0], ne[0]) && between(sw[1], ll[1], ne[1]);
}

function inside(ll, shape) {
  return shape.length > 2 ? insidePolygon(ll, shape) : insideRectangle(ll, shape);
}

// range is Array of rectangles [ [SW.lon, SW.lat], [NE.lon, NE.lat] ]
export default function bounds(range) {
  if (range) {
    return function (ll) {
      return ll && range.some(inside.bind(null, ll));
    };
  }

  range = [];

  function bnds(ll) {
    return range.length === 2 && insideRectangle(ll, range);
  }

  bnds.extend = function (ll) {
    if (!range.length) {
      range.push(ll);
      range.push(ll);
    } else {
      let r = range[0];
      range[0] = [Math.min(ll[0], r[0]), Math.min(ll[1], r[1])];
      r = range[1];
      range[1] = [Math.max(ll[0], r[0]), Math.max(ll[1], r[1])];
    }
  };

  bnds.get = function () {
    return [range];
  };

  return bnds;
}
