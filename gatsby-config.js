const path = require(`path`);

const config = require(`./src/utils/siteConfig`);
const generateRSSFeed = require(`./src/utils/rss/generate-feed`);

/**
 * This is the place where you can tell Gatsby which plugins to use
 * and set them up the way you want.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
 *
 */
module.exports = {
    siteMetadata: {
        siteUrl: config.siteUrl,
        siteNavegacao: {
            codeinjection_foot: null,
            codeinjection_head: null,
            codeinjection_styles: "",
            cover_image: "images/banner.png",
            description: "Mais um blog javascript, oxente!",
            facebook: "oxentejs",
            icon: "https://gatsby.ghost.io/content/images/2019/01/favicon.png",
            lang: "en",
            logo: "https://static.ghost.org/v1.0.0/images/ghost-logo.svg",
            navigation: [{ label: "Home", url: "/" }],
            timezone: "Etc/UTC",
            title: "OxenteJS - Mais um blog",
            twitter: "@oxentejs"
        }
    },
    plugins: [
        /**
         *  Content Plugins
         */
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `pages`),
                name: `pages`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `posts`),
                name: `posts`
            }
        },
        // Setup for optimised images.
        // See https://www.gatsbyjs.org/packages/gatsby-image/
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `images`),
                name: `images`
            }
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,

        /**
         *  Utility Plugins
         */
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: []
            }
        },
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-force-trailing-slashes`,
        `gatsby-plugin-offline`,
        `gatsby-plugin-netlify-cms`
    ]
};
