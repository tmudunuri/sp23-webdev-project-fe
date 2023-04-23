import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings";
import { SectionDescription } from "components/misc/Typography";
import { ReactComponent as TwitterIcon } from "images/twitter-icon.svg";
import { ReactComponent as LinkedinIcon } from "images/linkedin-icon.svg";
import { ReactComponent as GithubIcon } from "images/github-icon.svg";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";

const HeadingContainer = tw.div``
const Heading = tw(SectionHeading)``
const Subheading = tw(SubheadingBase)`text-center mb-3`
const Description = tw(SectionDescription)`mx-auto text-center`

const Cards = tw.div`flex flex-wrap flex-row justify-center sm:max-w-2xl lg:max-w-5xl mx-auto`
const Card = tw.div`mt-24 w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center`
const CardImage = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`w-64 h-64 bg-contain bg-center rounded`}
`
const CardContent = styled.div`
  ${tw`flex flex-col items-center mt-6`}
  .position {
    ${tw`uppercase font-bold tracking-widest text-xs text-primary-500`}
  }
  .name {
    ${tw`mt-1 text-xl font-medium text-gray-900`}
  9
`

const CardLinks = styled.div`
  ${tw`mt-6 flex`}
  .link {
    ${tw`mr-8 last:mr-0 text-gray-400 hocus:text-primary-500 transition duration-300`}
    .icon {
      ${tw`fill-current w-6 h-6`}
    }
  }
`

export default ({
    heading = "Meet These Fine Folks.",
    subheading = "Our Team",
    description = "Grad Team #22",
    cards = [
        {
            imageSrc: "https://media.licdn.com/dms/image/C4D03AQHdrpK9T2_Bqg/profile-displayphoto-shrink_800_800/0/1644877030267?e=2147483647&v=beta&t=Dqt5R0Td4j-d1SKbNLg688VB3CP12AVG-6CGI2DEuuM",
            position: "Developer",
            name: "Anush M Nagesh",
            links: [
                {
                    url: "https://twitter.com",
                    icon: TwitterIcon,
                },
                {
                    url: "https://linkedin.com",
                    icon: LinkedinIcon,
                },
                {
                    url: "https://github.com",
                    icon: GithubIcon,
                },
            ],
        },
        {
            imageSrc: "https://d33wubrfki0l68.cloudfront.net/fe1bcdca4326e883b66cca8135db54d0dd0e2cba/f1f1d/images/dp_hu9dc55d474e1de8c7653509fcfaf45f92_144380_320x0_resize_q75_box.jpg",
            position: "Developer",
            name: "Thrivikram Mudunuri",
            links: [
                {
                    url: "https://twitter.com",
                    icon: TwitterIcon,
                },
                {
                    url: "https://linkedin.com",
                    icon: LinkedinIcon,
                },
                {
                    url: "https://github.com",
                    icon: GithubIcon,
                },
            ],
        },
    ]
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
                <Cards>
                    {cards.map((card, index) => (
                        <Card key={index}>
                            <CardImage imageSrc={card.imageSrc} />
                            <CardContent>
                                <span className="position">{card.position}</span>
                                <span className="name">{card.name}</span>
                                {/* <CardLinks>
                                    {card.links.map((link, linkIndex) => (
                                        <a key={linkIndex} className="link" href={link.url}>
                                            <link.icon className="icon" />
                                        </a>
                                    ))}
                                </CardLinks> */}
                            </CardContent>
                        </Card>
                    ))}
                </Cards>
            </ContentWithPaddingXl>
        </AnimationRevealPage >
    );
};
