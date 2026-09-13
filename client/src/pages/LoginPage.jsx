import { GoogleLogin } from "@react-oauth/google";
import api from "../axios";

function LoginPage() {
    const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await api.post("/google_login", {
        credential: credentialResponse.credential,
      });

      console.log("Login response:", response.data);

    } catch (error) {
      console.log("Google login error:", error);
    }
  };
  return (
    <div>
      <h2>Money Manager</h2>

      <GoogleLogin
       onSuccess={handleGoogleLogin}
        onError={() => {
          console.log("Google Login Failed");
        }}
      />
    </div>
  );
}

export default LoginPage;