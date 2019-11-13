import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import { Layout, PostCard } from "../components/common";
import { MetaData } from "../components/common/meta";

const Index = ({ data, location, pageContext }) => {
    const { allMarkdownRemark } = useStaticQuery(graphql`
        query PostListMarkDown {
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
                    </section>
                </div>
            </Layout>
        </>
    );
};

export default Index;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
