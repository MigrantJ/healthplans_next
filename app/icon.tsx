import { ImageResponse } from "next/server";
import { FaFileMedical } from "react-icons/fa";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 40,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    <FaFileMedical color="#4b8dce" size="32px" />,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
