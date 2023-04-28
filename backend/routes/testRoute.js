const express = require("express");
const router = express.Router();

router.get(`/search/:search_term`, (req, res) => {
    const search_term = req.params.search_term;
    res.json({search_term});
})


router.get(`/`, async(req, res) => {
    res.send("Working");
});

module.exports = router;