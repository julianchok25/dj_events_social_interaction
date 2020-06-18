import React, { useState, useEffect } from "react";
import BasicLayout from "../../layout/BasicLayout";
import { Spinner, ButtonGroup, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { isEmpty, set } from "lodash";
import { useDebouncedCallback } from "use-debounce";
import { getFollowsApi } from "../../api/Follow";
import ListFollows from "../../components/ListFollows";

import "./Follows.scss";
import { signInApi } from "../../api/auth";

function Follows(props) {
  const { setRefreshCheckLogin, location, history } = props;
  const [follows, setFollows] = useState(null);
  const params = useFollowQuery(location);
  const [typeUser, setTypeUser] = useState(params.type || "follow");
  const [btnLoading, setBtnLoading] = useState(false);

  const [onSearch] = useDebouncedCallback((value) => {
    setFollows(null);
    history.push({
      search: queryString.stringify({ ...params, search: value, page: 1 }),
    });
  }, 200);

  useEffect(() => {
    getFollowsApi(queryString.stringify(params))
      .then((response) => {
        if (params.page == 1) {
          if (isEmpty(response)) {
            setFollows([]);
          } else {
            setFollows(response);
          }
        } else {
          if (!response) {
            setBtnLoading(0);
          } else {
            setFollows(...follows, ...response);
            setBtnLoading(false);
          }
        }
      })
      .catch((err) => {
        setFollows([]);
      });
  }, [location]);

  const onChangeType = (type) => {
    setFollows(null);
    if (type === "new") {
      setTypeUser("new");
    } else {
      setTypeUser("follow");
    }

    history.push({
      search: queryString.stringify({ type: type, page: 1, search: "" }),
    });
  };

  const moreData = () => {
    setBtnLoading(true);
    const newPage = parseInt(params.page) + 1;
    history.push({
      search: queryString.stringify({ ...params, page: newPage }),
    });
  };

  return (
    <div>
      <BasicLayout
        className="follows"
        title="Followers"
        setRefreshCheckLogin={setRefreshCheckLogin}
      >
        <div className="follows__title">
          <h2>Followers</h2>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <ButtonGroup className="follows__options">
          <Button
            variant="danger"
            className={typeUser === "follow" && "active"}
            onClick={() => onChangeType("follow")}
          >
            Following
          </Button>
          <Button
            className={typeUser === "new" && "active"}
            variant="danger"
            onClick={() => onChangeType("new")}
          >
            New Users
          </Button>
        </ButtonGroup>

        {!follows ? (
          <div className="follows__loading">
            <Spinner animation="border" variant="info" />
            Search Users
          </div>
        ) : (
          <>
            <ListFollows follows={follows} />
            <Button onClick={moreData} variant="danger" className="load-more">
              {!btnLoading ? (
                btnLoading !== 0 && "Search more users"
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
          </>
        )}
      </BasicLayout>
    </div>
  );
}

function useFollowQuery(location) {
  const { page = 1, type = "follow", search } = queryString.parse(
    location.search
  );

  return { page, type, search };
}

export default withRouter(Follows);
