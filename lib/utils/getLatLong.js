function binarySearch(arr, key) {
    let start = 0;
    let end = arr.length - 1;
    let mid;

    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        if (arr[mid].city === key) {
            return mid;
        } else if (arr[mid].city < key) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return -1;
}

export default function ({ cities, city, state }) {
    let i = binarySearch(cities, city);
    if (i === -1) return null;
    if (cities[i + 1] ? cities[i + 1].city : null === cities[i].city) {
        if (cities[i + 1].state === state) {
            i += 1;
        }
    }
    if (cities[i - 1] ? cities[i - 1].city : null === cities[i].city) {
        if (cities[i + 1].state === state) {
            i - 1;
        }
    }
    if (i === -1) return null;
    return { lat: cities[i].latitude, long: cities[i].longitude };
}
