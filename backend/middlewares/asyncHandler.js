const asyncHandler = (foo) => (req, res, next) => {
    Promise.resolve(foo(req, res, next).catch((error) => {
        res.status(500).json({message: error.message})
    }))
}

export default asyncHandler;