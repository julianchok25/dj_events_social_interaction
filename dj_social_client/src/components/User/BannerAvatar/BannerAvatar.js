import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { API_HOST } from "../../../utils/constants";
import AvatarNotFound from "../../../assets/png/avatar-no-found.png";
import ConfigModal from "../../Modal/ConfigModal/ConfigModal";
import EditUserForm from "../EditUserForm";
import {
  checkFollowApi,
  followUserApi,
  unFollowUserApi,
} from "../../../api/Follow";
import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { user, loggedUser } = props;
  const [showModal, setShowModal] = useState(false);
  const [following, setFollowing] = useState(null);
  const [reloadFollow, setReloadFollow] = useState(false);

  const bannerUrl = user?.banner ? `${API_HOST}/banners?id=${user.id}` : null;

  const urlAvatar = user?.avatar
    ? `${API_HOST}/avatars?id=${user.id}`
    : AvatarNotFound;

  useEffect(() => {
    if (user) {
      checkFollowApi(user?.id).then((response) => {
        if (response?.status == true) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
    setReloadFollow(false);
  }, [user, reloadFollow]);

  const onFollow = () => {
    followUserApi(user.id).then(() => {
      setReloadFollow(true);
    });
  };

  const unFollow = () => {
    unFollowUserApi(user.id).then(() => {
      setReloadFollow(true);
    });
  };

  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url("${bannerUrl}")` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url("${urlAvatar}")` }}
      ></div>
      {user && (
        <div className="options">
          {loggedUser._id === user.id && (
            <Button variant="danger" onClick={() => setShowModal(true)}>
              Edit Profile
            </Button>
          )}

          {loggedUser._id !== user.id &&
            following !== null &&
            (following ? (
              <Button variant="danger" onClick={unFollow} className="unfollow">
                <span>Following</span>
              </Button>
            ) : (
              <Button variant="danger" onClick={onFollow}>
                Follow
              </Button>
            ))}
        </div>
      )}
      <ConfigModal show={showModal} setShow={setShowModal} title="Edit Profile">
        <EditUserForm user={user} setShowModal={setShowModal} />
      </ConfigModal>
    </div>
  );
}
