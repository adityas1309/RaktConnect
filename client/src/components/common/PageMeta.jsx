import { Helmet } from "react-helmet-async";

const PageMeta = ({ title, favicon = "/favicon.ico" }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="icon" type="image/x-icon" href={favicon} />
    </Helmet>
  );
};

export default PageMeta;
