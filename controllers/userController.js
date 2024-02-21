exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/');
    });
};