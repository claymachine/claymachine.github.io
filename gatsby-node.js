exports.onCreatePage = ({ page, actions }) => {
    const { createPage } = actions;

    if (page.path === '/l/') {
        page.matchPath = '/l/*';
        createPage(page);
    }
};