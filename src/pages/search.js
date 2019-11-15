import React from "react";
import { Link } from "gatsby";
import { Layout } from "../components/common";
import Search from "../components/Search";

const NotFoundPage = () => (
    <Layout>
        <div className="container">
            <Search />
        </div>
    </Layout>
);

export default NotFoundPage;
