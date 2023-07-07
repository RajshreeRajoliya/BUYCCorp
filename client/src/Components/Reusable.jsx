import { toast } from "react-toastify";

//this is css style which will be consitnent through out the ui for better css

export const cssStyles = {
  boxShadow1: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;`,
  boxShadow2: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
  medium: "1.4rem",
  small: "1rem",
};

//this is backend api link

// export const Api_Link = `http://localhost:8080`;
 
export const Api_Link=`https://enthusiastic-suspenders-jay.cyclic.app`


//all the allerts are made here once so i can use them wehere ever i want just by importing them and this will
//be save time and less code will be there like normal js alert

export const succesAlert = (message, theme) => {
  toast.success(message, { theme, position: "top-center" });
};
export const errorAlert = (message, theme) => {
  toast.error(message, { theme, position: "top-center" });
};

export const infoAlert = (message, theme) => {
  toast.info(message, { theme, position: "top-center" });
};
export const warningAlert = (message, theme) => {
  toast.warning(message, { theme, position: "top-center" });
};
export const defaultAlert = (message, theme) => {
  toast(message, { theme, position: "top-center" });
};


//this uploadFiles Function takes image from frontend and then upload to cloud database cloudinary and give us the 
//return the link of that image

export const uploadFilesFunction = async (image) => {
  try {
    const filesData = new FormData();
    filesData.append("file", image);
    filesData.append("upload_preset", "demoapp");
    filesData.append("cloud_name", "dtkgxbbb7");

    let res = await fetch(
      `https://api.cloudinary.com/v1_1/dtkgxbbb7/image/upload`,
      {
        method: "POST",
        body: filesData,
      }
    );
    let after = await res.json();
    return after.secure_url;
  } catch (error) {}
};
