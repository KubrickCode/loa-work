import { Helmet as ReactHelmet } from "react-helmet-async";

export const Helmet = ({ title }: { title: string }) => {
  return (
    <ReactHelmet>
      <title>{title}</title>
    </ReactHelmet>
  );
};
