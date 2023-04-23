import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import ProfileBreweryCards from "components/cards/ProfileBreweryCards";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import Header from "components/headers/light.js";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";

import ProfileCard from "components/cards/ProfileCard";

const HeadingRow = tw.div`flex`;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${props =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;

export default ({
  headingText = "Profile",
}) => {
  // const { uid } = useParams();
  // console.log(uid);
  const [visible, setVisible] = useState(7);
  const onLoadMoreClick = () => {
    setVisible(v => v + 6);
  };

  // const [searchParams, setSearchParams] = useSearchParams();
  // const [uid, setUid] = useState(searchParams.get("uid"))

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow>
          <ProfileCard>
          </ProfileCard>

          <ProfileBreweryCards
            heading={
              <>
                Some <HighlightedText>Highlights</HighlightedText>
              </>
            }
          />

        </ContentWithPaddingXl>
      </Container>
    </AnimationRevealPage>
  );
};