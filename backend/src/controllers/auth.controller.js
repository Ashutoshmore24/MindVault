// Handles the successful redirect back to your Vite React frontend
const googleAuthCallback = (req, res) => {
    req.session.save((err) => {
        if (err) {
            console.error("Session save error:", err);
            const redirectUrl = process.env.CLIENT_URL ? `${process.env.CLIENT_URL.replace(/\/$/, '')}/login` : '/login';
            return res.redirect(redirectUrl);
        }
        const redirectUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL : '/';
        res.redirect(redirectUrl); 
    });
};

// Protects endpoints and exposes the logged-in user details to React
const getProfile = (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({
            authenticated: true,
            user: {
                id: req.user._id,      
                name: req.user.displayName,
                email: req.user.email,   
                avatar: req.user.avatar  
            }
        });
    } else {
        res.status(401).json({ 
            authenticated: false, 
            message: "Not authorized" 
        });
    }
};

// Safely terminates the Passport session (Modern Async Callback style)
const googleAuthLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) { 
            return next(err); 
        }

        req.session.destroy((sessionErr) => {
            if (sessionErr) return next(sessionErr);
            res.clearCookie('connect.sid'); 
            
            res.status(200).json({ message: "Logged out successfully" });
        });
    });
};


export { googleAuthCallback, getProfile, googleAuthLogout };