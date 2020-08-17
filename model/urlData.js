module.exports = class urlData {
  constructor(title, depth, url, links) {
    this.title = title;
    this.depth = depth;
    this.url = url;
    this.links = links || [];
  }
}

