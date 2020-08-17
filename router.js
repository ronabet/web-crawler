const crawlerModule = require('./crawlerModule/crawler');

module.exports = (app) => {
  app.post("/api/crawl", async (req, res) => {
    await crawlerModule.crawl(req.body.startUrl, req.body.maxDepth, req.body.maxPages, res);
  });
}