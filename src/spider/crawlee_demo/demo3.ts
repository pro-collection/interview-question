import { RequestQueue, CheerioCrawler } from "crawlee";

const runner = async () => {
  const requestQueue = await RequestQueue.open();
  await requestQueue.addRequest({ url: "https://crawlee.dev" });

  const crawler = new CheerioCrawler({
    requestQueue,
    // The `$` argument is the Cheerio object
    // which contains parsed HTML of the website.
    async requestHandler({ $, request }) {
      // Extract <title> text with Cheerio.
      // See Cheerio documentation for API docs.
      const title = $("title").html();
      console.log(`The title of "${request.url}" is: ${title}.`);
    },
  });

  await crawler.run();
};

runner();
