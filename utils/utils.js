const urlData = require("../model/urlData");
const cheerio = require("cheerio");
const got = require("got");
const config = require('../config/config');
const urlValidator = require("../validator/urlValidations");

exports.findLinks = async (url, currDepth) => {
    const urlRegex = config.config.urlRegex;
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
      .filter(urlValidator.hrefExists)
      .filter(urlValidator.noParens)
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