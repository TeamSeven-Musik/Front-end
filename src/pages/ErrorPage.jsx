import React from "react";
import { useNavigate } from "react-router-dom";
import { IoWarning } from "react-icons/io5";
import classNames from "classnames/bind";

function ErrorPage({ errorMessage }) {
  const navigate = useNavigate();
  const cx = classNames.bind(styles);

  return (
    <div className={styles.notFound}>
      {errorMessage ? (          
        <div className={cx("notification-container")}>
            <span className={cx("notification-icon")}>
              <IoWarning />
            </span>
            <h2>{errorMessage}</h2>
          </div>) : (
      <><h1>404</h1>
      <h2>Page Not Found</h2>
      <p>"Sorry, the page you are looking for does not exist."</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Go Back to Home
      </Button>
      </>)}
    </div>
  );
}

export default ErrorPage;