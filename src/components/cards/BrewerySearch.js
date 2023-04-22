import React, { useCallback, useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import DesignIllustration from "../../images/design-illustration-2.svg";

import { breweryImages } from "helpers/imageSources";
import { getFormattedPhoneNumber } from "helpers/dataUtil";

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const Form = tw.form`mx-auto`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;

const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

export default ({
    heading = "Checkout the Menu",
}) => {
    /*
     * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
     * as the key and value of the key will be its content (as an array of objects).
     * To see what attributes are configurable of each object inside this array see the example above for "Starters".
     */

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("query"));
    const [breweries, setBreweries] = useState([]);
    const breweriesData = {
        Breweries: breweries,
    }
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const tabsKeys = Object.keys(breweriesData);
    const [activeTab, setActiveTab] = useState(tabsKeys[0]);

    const searchSubmitHandler = e => {
        e.preventDefault()
        setIsSubmitting(true)
        setError("")

        const endpoint = "/search?query=" + searchQuery + "&per_page=12";
        fetch("https://api.openbrewerydb.org/v1/breweries" + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async response => {
            setIsSubmitting(false)
            setBreweries([])
            if (response.ok) {
                const data = await response.json()
                data.forEach(element => {
                    element.image = breweryImages[Math.floor(Math.random() * breweryImages.length)];
                    setBreweries(breweries => [...breweries, element]);
                });
            } else {
                alert("Could not search Breweries")
            }
        })
    }

    const fetchBreweriesByQuery = useCallback(() => {
        const endpoint = "/search?query=" + searchQuery + "&per_page=12";
        fetch("https://api.openbrewerydb.org/v1/breweries" + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async response => {
            setIsSubmitting(false)
            setBreweries([])
            if (response.ok) {
                const data = await response.json()
                data.forEach(element => {
                    element.image = breweryImages[Math.floor(Math.random() * breweryImages.length)];
                    setBreweries(breweries => [...breweries, element]);
                });
            } else {
                alert("Could not search Breweries")
            }
        })
    }, [])

    useEffect(() => {
        fetchBreweriesByQuery();
    }, [])

    return (
        <Container>
            <ContentWithPaddingXl>
                <HeaderRow>
                    <Header>{heading}</Header>
                    <Actions>
                        <Form onSubmit={searchSubmitHandler} >
                            <Input
                                type="text"
                                placeholder="Enter Query"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)} />
                            <SubmitButton
                                disabled={isSubmitting} type="submit" >
                                <span className="text">{`${isSubmitting ? "Searching" : "Search"}`}</span>
                            </SubmitButton>
                        </Form>
                    </Actions>

                    <TabsControl>
                        {Object.keys(breweriesData).map((tabName, index) => (
                            <TabControl key={index} active={activeTab === tabName} onClick={() => setActiveTab(tabName)}>
                                {tabName}
                            </TabControl>
                        ))}
                    </TabsControl>
                </HeaderRow>

                {tabsKeys.map((tabKey, index) => (
                    <TabContent
                        key={index}
                        variants={{
                            current: {
                                opacity: 1,
                                scale: 1,
                                display: "flex",
                            },
                            hidden: {
                                opacity: 0,
                                scale: 0.8,
                                display: "none",
                            }
                        }}
                        transition={{ duration: 0.4 }}
                        initial={activeTab === tabKey ? "current" : "hidden"}
                        animate={activeTab === tabKey ? "current" : "hidden"}
                    >
                        {breweriesData[tabKey].map((card, index) => (

                            <CardContainer key={index}>
                                <Link to={"/brewery/" + card.id}>
                                    <Card className="group" href={card.name} initial="rest" whileHover="hover" animate="rest">
                                        <CardImageContainer imageSrc={card.image}>
                                            <CardRatingContainer>
                                                {/* <CardRating>
                                                <StarIcon />
                                                {card.name}
                                            </CardRating> */}
                                                <CardReview>{getFormattedPhoneNumber(card.phone)}</CardReview>
                                            </CardRatingContainer>
                                            <CardHoverOverlay
                                                variants={{
                                                    hover: {
                                                        opacity: 1,
                                                        height: "auto"
                                                    },
                                                    rest: {
                                                        opacity: 0,
                                                        height: 0
                                                    }
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <CardButton>Visit</CardButton>
                                            </CardHoverOverlay>

                                        </CardImageContainer>
                                        <CardText>
                                            <CardPrice>{card.name}</CardPrice>
                                            <CardTitle>{card.city}</CardTitle>
                                            <CardContent>{card.street}</CardContent>

                                        </CardText>
                                    </Card>
                                </Link>
                            </CardContainer>
                        ))}
                    </TabContent>
                ))}
            </ContentWithPaddingXl>
            <DecoratorBlob1 />
            <DecoratorBlob2 />
        </Container >
    );
};