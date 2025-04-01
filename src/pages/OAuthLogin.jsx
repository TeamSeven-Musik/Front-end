import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const OAuthLogin = ({ onLoginSuccess, onLoginFailure }) => {

  return (
    <div className="space-y-4">
      {/* Google Login */}
      <GoogleOAuthProvider clientId="310764216947-6bq7kia8mnhhrr9mdckbkt5jaq0f2i2o.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            onLoginSuccess({
              provider: "google",
              ...credentialResponse,
            });
          }}
          onError={() => {
            onLoginFailure("Google login failed!");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default OAuthLogin;
