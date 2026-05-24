// Error Controller - Handles error pages like 404

// 404 Page Not Found handler
exports.get404 = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        currentPage: ''
    });
};
