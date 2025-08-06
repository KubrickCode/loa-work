import { Helmet as ReactHelmet } from "react-helmet-async";

export type HelmetProps = {
  title: string;
  description: string;
};

export const Helmet = ({
  title,
  description = "로스트아크 컨텐츠별 시급 정보를 제공하는 사이트입니다.",
}: HelmetProps) => {
  const fullTitle = `${title} | 로직장`;
  const keywords = "로스트아크, Lost Ark, 시급, 로아, 쌀먹, 보상, 게임, MMORPG";
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
