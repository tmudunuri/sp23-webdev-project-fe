import React, { useCallback, useState, useEffect, useContext } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import BrewerySearch from "components/cards/BrewerySearch";

export default () => {
    const Subheading = tw.span`tracking-wider text-sm font-medium`;
    const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
    const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
    const Description = tw.span`inline-block mt-8`;
    const imageCss = tw`rounded-4xl`;

    return (
        <AnimationRevealPage>
            <Header />
            <BrewerySearch
                heading={
                    <>
                        Search for <HighlightedText>Breweries</HighlightedText>
                    </>
                }
            />
        </AnimationRevealPage>
    );
}
