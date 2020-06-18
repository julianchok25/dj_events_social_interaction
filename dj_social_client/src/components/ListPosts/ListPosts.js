import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { map, fromPairs } from "lodash";
import moment from "moment";
import { getUserApi } from "../../api/user";
import AvatarNotFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../utils/constants";
import { replaceURLWithHTMLLinks } from "../../utils/functions";

import "./ListPosts.scss";

export default function ListPosts(props) {
  const { posts } = props;

  return (
    <div className="list-posts">
      {map(posts, (post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}

function Post(props) {
  const { post } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
    getUserApi(post.userId).then((response) => {
      setUserInfo(response);
      setAvatarUrl(
        response?.avatar
          ? `${API_HOST}/avatars?id=${response.id}`
          : AvatarNotFound
      );
    });
  }, [post]);
  return (
    <div className="post">
      <Image className="avatar" src={avatarUrl} roundedCircle />
      <div>
        <div className="name">
          {userInfo?.name} {userInfo?.lastName}
          <span>{moment(post.date).calendar()}</span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(post.message),
          }}
        />
      </div>
    </div>
  );
}
