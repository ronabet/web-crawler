 // Check if href exists
exports.hrefExists = (i,link) => {
    if (typeof link.attribs.href === "undefined") {
      return false;
    }
    return link.attribs.href;
};
  
// Regular expression to determine if the text has parentheses.
exports.noParens = (i, link) => {
    const parensRegex = /^((?!\().)*$/;
    if (!link || !link.children || !link.children[0] || !link.children[0].data) return false;
    return parensRegex.test(link.children[0].data);
};