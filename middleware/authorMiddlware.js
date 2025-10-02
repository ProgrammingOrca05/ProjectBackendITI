const jwt = require("jsonwebtoken");

// authenticate token التحقق من صحة الرمز
function authenticate(req, res, next) {
    // 1) try Authorization header (Bearer or raw)
    const authHeader = req.headers && (req.headers['authorization'] || req.headers['Authorization']);
    let token = null;

    if (authHeader) {
        // header could be "Bearer <token>" or just the token
        const parts = authHeader.split(' ');
        token = parts.length === 1 ? parts[0] : parts[1];
    }

    // 2) fallback to cookie (if present and server uses cookie parser)
    if (!token && req.cookies && req.cookies.ehgzly_token) {
        token = req.cookies.ehgzly_token;
    }

    // 3) final fallback: local header name variations
    if (!token && req.headers && req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }

    // sanitize token (strip wrapping quotes)
    if (token && typeof token === 'string') {
        token = token.trim();
        if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
            token = token.slice(1, -1);
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "Access denied! No token provided",
            status: "fail",
            data: null
        }); // تم رفض الوصول! لم يتم تقديم أي رمز
    }

    try {
        if (!process.env.JWT_SECRET) {
            console.warn('JWT_SECRET is not set in environment - jwt.verify will likely fail');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification failed:', err && err.message ? err.message : err);
        // return a clear message for debugging; consider removing the error detail in production
        return res.status(403).json({
            message: "Invalid token",
            error: err && err.message ? err.message : undefined,
            status: "fail",
            data: null
        }); // رمز غير صالح
    }
}

module.exports = authenticate; // export middleware
