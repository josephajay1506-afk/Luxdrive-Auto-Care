  const Toast = ({ message, type = "success" }) => {
    return (
      <div
        className={`fixed top-3 right-4 px-4 py-3 rounded-lg shadow-lg text-white z-50
          ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
      >
        {message}
      </div>
    );
  };

  export default Toast;