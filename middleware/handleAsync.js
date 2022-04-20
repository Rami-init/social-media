const handleAsync = (awaitFunc)=> (req, res, next)=> Promise.resolve(awaitFunc(req, res, next)).catch(next)

module.exports = handleAsync