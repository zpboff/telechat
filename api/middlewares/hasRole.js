export default requiredRole => {
    return (req, res, next) => {
        if (req.currentUser.role === requiredRole) {
            return next();
        } else {
            return res.status(401).send("Action not allowed");
        }
    };
};
