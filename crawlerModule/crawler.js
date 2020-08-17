const utils = require('../utils/utils')

exports.crawler = async (startUrl, maxDepth, maxPages, res) => {
  let currentDepthLinks = (await utils.findLinks(startUrl, 0)).links;
  let nextDepthLinks = [];
  const crawlerOutput = [];
  currentPages = 0;
  let currentDepth = 0;
  let stop = false;
  while (
    !stop &&
    currentDepth < maxDepth &&
    currentPages < maxPages &&
    currentDepthLinks.length > 0
  ) {
    console.log(
      `currentPages : ${currentPages} , currentDepth : ${currentDepth}`
    );
    let currentJobs = [];
    // crawl each url in this depth
    currentJobs = currentDepthLinks.map((url) => {
      return utils.findLinks(url, currentDepth);
    });
    await Promise.all(currentJobs).then((crawlData) => {
      for (const index in crawlData) {
        if (crawlData[index] && currentPages < maxPages) {
          currentPages++;
          crawlerOutput.push(crawlData[index]);
          nextDepthLinks.push(...crawlData[index].links);
        }
      }
    });
    currentDepth++;
    currentDepthLinks = nextDepthLinks;
    nextDepthLinks = [];
  }
  res.send(crawlerOutput);
};
