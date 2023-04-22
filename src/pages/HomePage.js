import React, { useCallback, useState, useEffect, useContext } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { UserContext } from "../context/UserContext"
import Header from "components/headers/light.js";
import BreweryCity from "components/cards/BreweryCity";
import BreweryHero from "components/hero/BreweryHero";
import Hero from "components/hero/TwoColumnWithVideo.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
import TabGrid from "components/cards/TabCardGrid.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import DownloadApp from "components/cta/DownloadApp.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

import chefIconImageSrc from "images/chef-icon.svg";
import celebrationIconImageSrc from "images/celebration-icon.svg";
import shopIconImageSrc from "images/shop-icon.svg";
import BreweryCards from "components/cards/BreweryCards";

export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;
  const [userContext, setUserContext] = useContext(UserContext);

  return (
    <AnimationRevealPage>
      {!userContext.token &&
        <BreweryHero>
        </BreweryHero>
      }
      {userContext.token &&
        <>
          <Header />
          <BreweryCity />
        </>
      }
      <BreweryCards
        heading={
          <>
            Checkout the hottest <HighlightedText>Breweries</HighlightedText>
          </>
        }
      />
    </AnimationRevealPage>
  );
}
