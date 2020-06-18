import React, { useEffect, useState } from "react";
import { Media, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_HOST } from "../../utils/constants";
import AvatarNotFound from "../../assets/png/avatar-no-found.png";
import { getUserApi } from "../../api/user";

export default function User(props) {
  const { follow } = props;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserApi(follow.id).then((response) => {
      setUserInfo(response);
    });
  }, [follow]);

  return (
    <Media as={Link} to={`/${follow.id}`} className="list-follows__follow">
      <Image
        width={64}
        height={64}
        roundedCircle
        className="mr-3"
        src={
          userInfo?.avatar
            ? `${API_HOST}/avatars?id=${follow.id}`
            : AvatarNotFound
        }
        alt={`${follow.name} ${follow.lastName}`}
      />
      <Media.Body>
        <h5>
          {follow.name} {follow.lastName}
        </h5>
        <p>{userInfo?.bio}</p>
      </Media.Body>
    </Media>
  );
}
