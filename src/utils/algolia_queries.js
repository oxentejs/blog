const postQuery = `{
        posts: allMarkdownRemark {
            edges {
                node {
                    objectID: id
                    frontmatter {
                        title
                        date_timestamp: date
                        date(
                            locale: "pt-br"
                            formatString: "DD [de] MMMM [de] YYYY"
                        )
                        feature_image
                        tags
                        author_name
                        excerpt
                    }
                    timeToRead
                    excerpt(pruneLength: 5000)
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;

const flatten = arr =>
    arr.map(({ node: { frontmatter, timeToRead, ...rest } }) => ({
        ...frontmatter,
        timeToRead,
        date_timestamp: parseInt(
            (new Date(frontmatter.date_timestamp).getTime() / 1000).toFixed(0)
        ),
        ...rest
    }));

const queries = [
    {
        query: postQuery,
        transformer: ({ data }) => flatten(data.posts.edges), // optional
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME, // overrides main index name, optional
        settings: {
            attributesToSnippet: ["excerpt:20"]
            // optional, any index settings
        },
        matchFields: ["slug", "modified"] // Array<String> overrides main match fields, optional
    }
];

module.exports = queries;
