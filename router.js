const crawlerModule = require('./crawlerModule/crawler');

module.exports = (app) => {
  app.post("/api/crawling", async (req, res) => {
    await crawlerModule.crawler(req.body.startUrl, req.body.maxDepth, req.body.maxPages, res);
  });
}