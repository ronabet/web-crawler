

exports.checkHrefExists = (req, res) => {
    const url = req.body.url;
    if (typeof url.attribs.href === "undefined") {
        return false;
    }
    return url.attribs.href;
}

exports.noParens = (req, res) => {
    // Regular expression to determine if the text has parentheses.
    const url = req.body.url;
    const parensRegex = /^((?!\().)*$/;
    if (!url) return false;
    if (!url.children) return false;
    if (!url.children[0]) return false;
    if (!url.children[0].data) return false;
    return parensRegex.test(lurl.children[0].data);
}




