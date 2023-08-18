import React from "react";
import "./Deactivated.scss";

export const Deactivated = () => {
  return (
    <div className="all">
      <div className="container">
        <div className="all__inner">
          <div className="all__deactivated">
            <h2 className="all__deactivated-title">Deactivated</h2>
            <p className="all__deactivated-text">
              Please contact TheJobPortal Team to activate the access to
              TheJobPortal Talent Pool via
            </p>
            <a
              className="all__deactivated-link"
              href="mailto:support@johnhocadev"
            >
              support@johnhocadev.co
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
