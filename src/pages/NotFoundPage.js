import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import Header from "components/headers/light.js";

import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings";
import { SectionDescription } from "components/misc/Typography";

const HeadingContainer = tw.div``
const Heading = tw(SectionHeading)``
const Subheading = tw(SubheadingBase)`text-center text-red-500 mb-3`
const Description = tw(SectionDescription)`mx-auto text-center`

export default ({
  heading = "Page Not Found",
  subheading = "Error 404",
  description = "Please navigate to other pages"
}) => {
  return (
    <AnimationRevealPage>
      <Header />
      <ContentWithPaddingXl>
        <HeadingContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          {heading && <Heading>{heading}</Heading>}
          {description && <Description>{description}</Description>}
        </HeadingContainer>
      </ContentWithPaddingXl>
    </AnimationRevealPage>
  );
};