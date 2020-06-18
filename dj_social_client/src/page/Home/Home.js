import React, { useState, useEffect } from "react";
import BasicLayout from "../../layout/BasicLayout";
import ListPosts from "../../components/ListPosts";
import { Button, Spinner } from "react-bootstrap";
import { getPostHomeApi } from "../../api/posts";

import "./Home.scss";

export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingPost, setLoadingPost] = useState(false);

  useEffect(() => {
    getPostHomeApi(page)
      .then((response) => {
        console.log(response);

        if (!posts && response) {
          setPosts(formatModel(response));
        } else {
          if (!response) {
            setLoadingPost(0);
          } else {
            const data = formatModel(response);
            setPosts([...posts, ...data]);
            setLoadingPost(false);
          }
        }
      })
      .catch((err) => {});
  }, [page]);

  const moreData = () => {
    setLoadingPost(true);
    setPage(page + 1);
  };

  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="home__title">
        <h2>New posts from your favorite djs.</h2>
      </div>
      {posts && <ListPosts posts={posts} />}
      <Button variant="danger" onClick={moreData} className="load-more">
        {!loadingPost ? (
          loadingPost !== 0 ? (
            "Get more post"
          ) : (
            "Follow Djs to see their Publications!"
          )
        ) : (
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
      </Button>
    </BasicLayout>
  );
}

function formatModel(posts) {
  const postsTemp = [];
  posts.forEach((post) => {
    postsTemp.push({
      _id: post._id,
      userId: post.userRelationId,
      message: post.Post.message,
      date: post.Post.date,
    });
  });
  return postsTemp;
}
