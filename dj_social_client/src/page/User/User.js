import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import { getUserApi } from "../../api/user";
import BannerAvatar from "../../components/User/BannerAvatar";
import useAuth from "../../hooks/useAuth";
import InfoUser from "../../components/User/InfoUser";
import { getPostApi } from "../../api/posts";
import ListPosts from "../../components/ListPosts";
import "./User.scss";

function User(props) {
  const { match, setRefreshCheckLogin } = props;
  const { params } = match;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const loggedUser = useAuth();

  useEffect(() => {
    getUserApi(match.params.id)
      .then((response) => {
        setUser(response);
        if (!response) {
          toast.error("User not Exists");
        }
      })
      .catch((err) => {
        toast.error("User not Exists");
      });
  }, [params]);

  useEffect(() => {
    getPostApi(params.id, 1)
      .then((response) => {
        setPosts(response);
      })
      .catch(() => {
        setPosts([]);
      });
  }, [params]);

  const moreData = () => {
    const pageTemp = page + 1;
    setLoadingPosts(true);

    getPostApi(params.id, pageTemp).then((response) => {
      if (!response) {
        setLoadingPosts(0);
      } else {
        setPosts([...posts, ...response]);
        setPage(pageTemp);
        setLoadingPosts(false);
      }
    });
  };

  return (
    <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="user__title">
        <h2>{user ? `${user.name} ${user.lastName}` : "User not Exists"}</h2>
      </div>
      <BannerAvatar user={user} loggedUser={loggedUser}></BannerAvatar>
      <InfoUser user={user}></InfoUser>
      <div className="user__post">
        <h3>Posts</h3>
        {posts && <ListPosts posts={posts} />}
        <Button variant="danger" onClick={moreData}>
          {!loadingPosts ? (
            loadingPosts !== 0 && "More Posts"
          ) : (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              arian-hidden="true"
            />
          )}
        </Button>
      </div>
    </BasicLayout>
  );
}

export default withRouter(User);
