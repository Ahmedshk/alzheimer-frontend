import axios from "../util/axios";

export const  getHomeSections = async () => {
  return await axios.get("/home");
};

export const getAboutSections =async () => {
  return await axios.get("/about");
};
export const getJoinSections = async() => {
  return await axios.get("/join");
};

export const getLawyerJoinSections = async() => {
  return await axios.get("/lawyer-join");
};


export const getPrivacyPolicySections =async () => {
  return await axios.get("/privacy-policy");
};

export const getTermAndConditionsSections = async () => {
  return await axios.get("/term-and-condition");
}
export const getFooterSections = async() => {
  return await axios.get("/footer");
};

export const putHomeImageSection = async(formData: any) => {
  return await axios.put("/home/image", formData);
};

export const putHomeSection = async(homeData: any) => {
  return await axios.put("/home", homeData);
};

export const putAboutImageSection = async(aboutData: any) => {
  return await axios.put("/about/image", aboutData);
};

export const putAboutSection = async(aboutData: any) => {
  return await axios.put("/about", aboutData);
};


export const putJoinImageSection = async(formData: any) => {
  return await axios.put("/join/image", formData);
};

export const putJoinSection = async(formData: any) => {
  return await axios.put("/join", formData);
};


export const putLawyerJoinSection = async(formData: any) => {
  return await axios.put("/lawyer-join", formData);
};

export const putLawyerImageJoinSection = async(formData: any) => {
  return await axios.put("/lawyer-join/image", formData);
};

export const putPrivacySection = async(formData: any) => {
  return await axios.put("/privacy-policy", formData);
};

export const putPrivacyImageSection = async(formData: any) => {
  return await axios.put("/privacy-policy/image", formData);
};

export const putTermAndConditionsImageSections = async(formData: any) => {
  return await axios.put("/term-and-condition/image", formData);
};

export const putTermAndConditionsSections = async(formData: any) => {
  return await axios.put("/term-and-condition", formData);
};


export const putFooterSection = async(formData: any) => {
  return await axios.put("/footer", formData);
};

export const putFooterImageSection = async(formData: any) => {
  return await axios.put("/footer/image", formData);
};
