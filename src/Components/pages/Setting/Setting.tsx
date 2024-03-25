import { Link } from "react-router-dom";

export const Setting = () => {
  return (
    <div>
      <Link to="/" className="text-white">
        back to /
      </Link>{" "}
      <p>設定ページ</p>
    </div>
  );
};
