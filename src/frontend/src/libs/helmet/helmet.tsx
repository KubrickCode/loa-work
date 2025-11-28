import { Helmet as ReactHelmet } from "react-helmet-async";

export type HelmetProps = {
  description: string;
  title: string;
};

export const Helmet = ({
  description = "로스트아크 컨텐츠별 시급 정보를 제공하는 사이트입니다.",
  title,
}: HelmetProps) => {
  const fullTitle = `${title} | 로직장`;
  const keywords = "로스트아크, Lost Ark, 시급, 로아, 쌀먹, 로직장, 보상, 게임, MMORPG";
  const image = "/loa-work-favicon.png";
  const currentUrl = window.location.href;

  return (
    <ReactHelmet>
      <title>{fullTitle}</title>
      <meta content={description} name="description" />
      <meta content={keywords} name="keywords" />

      {/* Open Graph */}
      <meta content={fullTitle} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={image} property="og:image" />
      <meta content={currentUrl} property="og:url" />
      <meta content="website" property="og:type" />

      {/* 검색엔진 크롤링 허용 */}
      <meta content="index, follow" name="robots" />

      {/* 언어 설정 */}
      <meta content="ko" name="language" />
    </ReactHelmet>
  );
};
