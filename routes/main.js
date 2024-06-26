let __path = process.cwd()

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__path + '/views/index.html')
})

module.exports = router;