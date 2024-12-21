import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const onclickHandle = () => {
    document.getElementById("fileInput")?.click();
    console.log("clicked");
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDagLeave = (e: any) => {
    setDragging(false);
  };

  const handleonDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const uploadedFile = e.dataTransfer.files[0];

    if (validateFiles(uploadedFile)) {
      setFile(uploadedFile);
    }
  };

  const handleChange = (e: any) => {
    const uploadedFile = e.target.files[0];

    if (validateFiles(uploadedFile)) {
      setFile(uploadedFile);
    }
  };

  const validateFiles = (file: any) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    // for drag and drop here types of the file needs to be mntioned.
    const maxFileSize = 5 * 1024 * 1024; // 5 MB

    if (!allowedTypes.includes(file.type)) {
      alert("Not a valid image type");
      return false;
    }
    if (file.size > maxFileSize) {
      alert("File Size exceeded");
      return false;
    }
    return true;
  };
  return (
    <>
      <div
        className="space-y-5 border-dashed border-teal-500 border-1 px-2 py-2 w-[220px]"
        onDragOver={handleDragOver}
        onDragLeave={handleDagLeave}
        onDrop={handleonDrop}>
        <div className="flex justify-center items-center">
          <FaFileUpload size={30} />
        </div>

        <div className="text-center">
          <div className="">
            <span
              className="dark:marker:text-indigo-400 text-indigo-600 cursor-pointer"
              onClick={onclickHandle}>
              Click To Upload
            </span>{" "}
            <span className="text-gray-300">Or </span>
            <span>Drag and Drop</span>
          </div>

          <div className="">
            <p className="text-gray-200">PNG, SVG, PDF or JPG (max 25 MB) </p>
          </div>
        </div>

        <input
          type="file"
          name=""
          id="fileInput"
          className="hidden"
          accept="image/jpg, image/png"
          onChange={handleChange}
        />

        {file && (
          <div className="flex justify-center items-center gap-3">
            <FaCheck color="green" />

            <div className="text-xs">{file.name}</div>
            {/* //fiving the state type of <File|null> is important */}
          </div>
        )}
      </div>
    </>
  );
};

export default FileUpload;
