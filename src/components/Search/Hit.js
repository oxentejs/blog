import React from "react";
import { PostCard } from "../common";

const Hit = ({ hit }) => <PostCard post={hit} slug={hit.fields.slug} />;

export default Hit;
