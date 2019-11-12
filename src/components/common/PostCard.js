import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { Tags } from "@tryghost/helpers-gatsby";

const PostCard = ({ post, timeToRead, slug }) => {
    //const url = `/${post.slug}/`;
    return (
        <Link to={slug} className="post-card">
            <header className="post-card-header">
                {post.feature_image && (
                    <div
                        className="post-card-image"
                        style={{
                            backgroundImage: `url(${post.feature_image})`
                        }}
                    ></div>
                )}
                {/*post.tags && (
                    <div className="post-card-tags">
                        {" "}
                        <Tags
                            post={post}
                            visibility="public"
                            autolink={false}
                        />
                    </div>
                )*/}
                {post.featured && <span>Featured</span>}
                <h2 className="post-card-title">{post.title}</h2>
            </header>
            <section className="post-card-excerpt">{post.excerpt}</section>
            <footer className="post-card-footer">
                <div className="post-card-footer-left">
                    <div className="post-card-avatar">
                        {post.author_img ? (
                            <img
                                className="author-profile-image"
                                src={post.author_img}
                                alt={post.author_name}
                            />
                        ) : (
                            <img
                                className="default-avatar"
                                src="/images/icons/avatar.svg"
                                alt={post.author_name}
                            />
                        )}
                    </div>
                    <span>{post.author_name}</span>
                </div>

                <div className="post-card-footer-right">
                    <div>{timeToRead} min</div>
                </div>
            </footer>
        </Link>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        tags: PropTypes.string.isRequired,
        author_name: PropTypes.string.isRequired,
        author_img: PropTypes.string
        /*featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,*/
    }).isRequired,
    timeToRead: PropTypes.string,
    slug: PropTypes.string.isRequired
};

export default PostCard;
