const path = require(`path`);
const { postsPerPage } = require(`./src/utils/siteConfig`);
const { paginate } = require(`gatsby-awesome-pagination`);

const { createFilePath } = require(`gatsby-source-filesystem`);

//To add the slug files to each post
exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    // Ensures we are processing only markdown files
    if (node.internal.type === "MarkdownRemark") {
        // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
        const slug = createFilePath({
            node,
            getNode,
            basePath: "pages"
        });

        // Creates new query'able field with name of 'slug'
        createNodeField({
            node,
            name: "slug",
            value: `/${slug.slice(12)}`
        });
    }
};

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    const blogPostTemplate = path.resolve(`src/templates/post.js`);
    // Query for markdown nodes to use in creating pages.
    // You can query for whatever data you want to create pages for e.g.
    // products, portfolio items, landing pages, etc.
    // Variables can be added as the second function parameter
    return graphql(
        `
            {
                allMarkdownRemark {
                    edges {
                        node {
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
        `
    ).then(result => {
        if (result.errors) {
            throw result.errors;
        }
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            createPage({
                // Path for this page — required
                path: node.fields.slug,
                component: blogPostTemplate,
                context: {
                    slug: node.fields.slug
                }
            });
        });
    });
};

//Daqui pra baixo é dependencia do gosth
/*
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    // Check for any errors
    if (result.errors) {
        throw new Error(result.errors);
    }

    const blogPosts = result.data.allMarkdownRemark.edges;

    // Load templates
    const indexTemplate = path.resolve(`./src/templates/index.js`);
    const tagsTemplate = path.resolve(`./src/templates/tag.js`);
    const authorTemplate = path.resolve(`./src/templates/author.js`);
    const pageTemplate = path.resolve(`./src/templates/page.js`);
    const blogPostTemplate = path.resolve(`src/templates/post.js`);
    //const postTemplate = path.resolve(`./src/templates/post.js`);

    // Create pages

    blogPosts.forEach(({ node }) => {
        createPage({
            // Path for this page — required
            path: node.fields.slug,
            component: blogPostTemplate,
            context: {
                slug: node.fields.slug
            }
        });
    });

    // Create pagination
    paginate({
        createPage,
        items: posts,
        itemsPerPage: postsPerPage,
        component: indexTemplate,
        pathPrefix: ({ pageNumber }) => {
            if (pageNumber === 0) {
                return `/`;
            } else {
                return `/page`;
            }
        }
    });
};
*/
