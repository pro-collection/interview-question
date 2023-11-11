class StatisticSDK {
  constructor(productID, baseURL) {
    this.productID = productID;
    this.baseURL = baseURL;
  }

  send(query = {}) {
    query.productID = this.productID;

    let data = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      data.append(key, value);
    }
    navigator.sendBeacon(this.baseURL, data);
  }
}
