import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

interface LoadingOrUnauthenticatedProps {
  status: string;
}

const LoadingOrUnauthenticated: React.FC<LoadingOrUnauthenticatedProps> = ({
  status,
}) => {
  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <FontAwesomeIcon
          icon={faCircleNotch}
          className="text-gray-300 animate-spin w-24 h-24"
        />
      </div>
    );
  }

  return null;
};

export default LoadingOrUnauthenticated;
