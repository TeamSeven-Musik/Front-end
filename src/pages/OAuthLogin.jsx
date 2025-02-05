import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const OAuthLogin = ({ onLoginSuccess, onLoginFailure }) => {
  // Facebook SDK Initialization
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "YOUR_FACEBOOK_APP_ID", // Thay bằng Facebook App ID
        cookie: true,
        xfbml: true,
        version: "v16.0",
      });
    };
  }, []);

  // Handle Facebook Login
  const handleFacebookLogin = () => {
    window.FB.login(
      (response) => {
        if (response.status === "connected") {
          const accessToken = response.authResponse.accessToken;
          // Get user details from Facebook
          window.FB.api("/me", { fields: "name,email,picture" }, (user) => {
            onLoginSuccess({
              provider: "facebook",
              ...user,
              accessToken,
            });
          });
        } else {
          onLoginFailure("Facebook login failed!");
        }
      },
      { scope: "public_profile,email" }
    );
  };

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

      {/* Facebook Login */}
      <button
        onClick={handleFacebookLogin}
        className="w-full py-2 bg-blue-500 rounded-lg text-white font-bold hover:bg-blue-600 transition duration-300 text-center"
      >
        Register with Facebook
      </button>
    </div>
  );
};

export default OAuthLogin;
