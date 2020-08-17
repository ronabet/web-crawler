const cheerio = require("cheerio");
const got = require("got");
const urlData = require("./model/urlData");
const startUrl = "www.google.co.il";

const hrefExists = (i, link) => {
  if (typeof link.attribs.href === "undefined") {
    return false;
  }
  return link.attribs.href;
};

const noParens = (i, link) => {
  // Regular expression to determine if the text has parentheses.
  const parensRegex = /^((?!\().)*$/;
  if (!link) return false;
  if (!link.children) return false;
  if (!link.children[0]) return false;
  if (!link.children[0].data) return false;
  return parensRegex.test(link.children[0].data);
};

const crawlUrl = async (url, currDepth) => {
  const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (!urlRegex.test(url)) {
    url = "http://".concat(url);
  }

  let linksArr = [];
  let response;
  try {
    response = await got(url);
  } catch (error) {
    return null;
  }
  console.log(`Crawling DEPTH:${currDepth} >> ${url}`);

  const $ = cheerio.load(response.body);
  const title = $("title").text();

  $("a")
    .filter(hrefExists)
    .filter(noParens)
    .each((i, link) => {
      const href = link.attribs.href;
      linksArr.push(href);
    });

  linksArr = linksArr
    .map((href) => {
      if (href[0] == "/") {
        return url.concat(href);
      }
      return href;
    })
    .filter((href) => {
      return href[0] == "#" ? false : true;
    });

  return new urlData(title, currDepth, url, linksArr);
};

const crawl = async (startUrl, maxDepth, maxPages) => {
  let currentDepthLinks = (await crawlUrl(startUrl, 0)).links;
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
    console.log(`currentPages : ${currentPages} , currentDepth : ${currentDepth}`);
    let currentJobs = [];
    // crawl each url in this depth
    currentJobs = currentDepthLinks.map((url) => {
      return crawlUrl(url, currentDepth);
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
  return crawlerOutput;
};

(async () => {
  console.log(startUrl);
  const data = await crawl(startUrl, 10, 5000);
  console.log(data, data.length);
})();
