// PermissionRequest.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PermissionRequest = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const navigate = useNavigate();

  const requestPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setHasPermission(true); // Permission granted
      navigate("/cam"); // Navigate to live feed
    } catch (error) {
      console.error("Permission denied:", error);
      setPermissionDenied(true); // Permission denied
    }
  };

  return (
    <div>
      <h2>We need access to your camera and microphone</h2>
      <button onClick={requestPermission}>Allow Access</button>
      {permissionDenied && (
        <p>You have denied access to the camera and microphone.</p>
      )}
    </div>
  );
};

export default PermissionRequest;
