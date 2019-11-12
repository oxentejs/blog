import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Index = ({ data, location, pageContext }) => {
    //const posts = data.allGhostPost.edges;
    const { allMarkdownRemark } = useStaticQuery(graphql`
        query PostList {
            allMarkdownRemark {
                edges {
                    node {
                        id
                        timeToRead
                        frontmatter {
                            title
                            date(
                                locale: "pt-br"
                                formatString: "DD [de] MMMM [de] YYYY"
                            )
                            feature_image
                            tags
                            author_name
                            excerpt
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    const postList = allMarkdownRemark.edges;

    console.log(postList);

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true}>
                <div className="container">
                    <section className="post-feed">
                        {postList.map(
                            ({
                                node: {
                                    id,
                                    frontmatter,
                                    timeToRead,
                                    fields: { slug }
                                }
                            }) => (
                                <PostCard
                                    key={id}
                                    timeToRead={timeToRead}
                                    post={frontmatter}
                                    slug={slug}
                                />
                            )
                        )}
                        {/*posts.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} />
                        ))*/}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    );
};

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    pageContext: PropTypes.object
};

export default Index;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
