import React, { useCallback, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext"
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { ReactComponent as PhoneIcon } from "feather-icons/dist/icons/phone.svg";
import { ReactComponent as MapIcon } from "feather-icons/dist/icons/map.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
export default () => {
    // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
    const [sliderRef, setSliderRef] = useState(null);
    const sliderSettings = {
        arrows: false,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 2,
                }
            },

            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    };

    /* Change this according to your needs */
    const cards = [
        {
            imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
            title: "Wyatt Residency",
            description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
            locationText: "Rome, Italy",
            pricingText: "USD 39/Day",
            rating: "4.8",
        },
        {
            imageSrc: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
            title: "Soho Paradise",
            description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
            locationText: "Ibiza, Spain",
            pricingText: "USD 50/Day",
            rating: 4.9,
        },
        {
            imageSrc: "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
            title: "Hotel Baja",
            description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
            locationText: "Palo Alto, CA",
            pricingText: "USD 19/Day",
            rating: "5.0",
        },
        {
            imageSrc: "https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
            title: "Hudak Homes",
            description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
            locationText: "Arizona, RAK",
            pricingText: "USD 99/Day",
            rating: 4.5,
        },
    ]
    const images = ["https://images.unsplash.com/photo-1577670772839-befb49f0bee5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
        "https://images.unsplash.com/photo-1566467021572-37fbefe8fcb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        "https://images.unsplash.com/photo-1570562180924-039327605190?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        "https://images.unsplash.com/photo-1464047736614-af63643285bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        "https://images.unsplash.com/photo-1438557068880-c5f474830377?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80",
        "https://images.unsplash.com/photo-1545140912-7d6443bd98b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=663&q=80",
        "https://images.unsplash.com/photo-1533242553289-5ed0b2bc5a74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
        "https://images.unsplash.com/photo-1569937728169-55804de260bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=683&q=80",
        "https://images.unsplash.com/photo-1542634093-e0198d4d1e46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ]
    const [userContext, setUserContext] = useContext(UserContext);
    const [breweriesByCity, setBreweriesByCity] = useState([]);
    const [city, setCity] = useState("Boston");
    const [error, setError] = useState("")

    const fetchUserDetails = useCallback(() => {
        let endpoint = "users/profile";
        fetch(process.env.REACT_APP_API_ENDPOINT + endpoint, {
            method: "GET",
            credentials: "include",
            // Pass authentication token as bearer token in header
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
        }).then(async response => {
            if (response.ok) {
                const data = await response.json()
                setCity(data.city)
                setUserContext(oldValues => {
                    return { ...oldValues, details: data }
                })
            } else {
                if (response.status === 401) {
                    // Edge case: when the token has expired.
                    // This could happen if the refreshToken calls have failed due to network error or
                    // User has had the tab open from previous day and tries to click on the Fetch button
                    window.location.reload()
                } else if (response.status == 404) {
                    setError("User not found")
                } else {
                    setUserContext(oldValues => {
                        return { ...oldValues, details: null }
                    })
                }
            }
        })
    }, [setUserContext, userContext.token])

    const fetchBreweriesByCity = useCallback(() => {
        const endpoint = "?by_city=" + city + "&per_page=12";
        fetch("https://api.openbrewerydb.org/v1/breweries" + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async response => {
            setBreweriesByCity([])
            if (response.ok) {
                const data = await response.json()
                data.forEach(element => {
                    element.image = images[Math.floor(Math.random() * images.length)];
                    setBreweriesByCity(breweriesByCity => [...breweriesByCity, element]);
                });
            } else {
                alert("Could not fetch Breweries")
            }
        })
    }, [city])

    useEffect(() => {
        if (!userContext.details && userContext.token) {
            fetchUserDetails()
        }
    }, [userContext.details])

    useEffect(() => {
        fetchBreweriesByCity();
    }, [city])

    return (
        <Container>
            <Content>
                <HeadingWithControl>
                    <Heading>Popular Breweries in <HighlightedText>{city}</HighlightedText> </Heading>
                    <Controls>
                        <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon /></PrevButton>
                        <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon /></NextButton>
                    </Controls>
                </HeadingWithControl>
                <CardSlider ref={setSliderRef} {...sliderSettings}>
                    {breweriesByCity.map((card, index) => (
                        <Card key={index}>
                            <Link to={"/brewery/" + card.id}>
                                <CardImage imageSrc={card.image} />
                                <TextInfo>
                                    <TitleReviewContainer>
                                        <Title>{card.name}</Title>
                                        {/* <RatingsInfo>
                                        <StarIcon />
                                        <Rating>{card.name}</Rating>
                                    </RatingsInfo> */}
                                    </TitleReviewContainer>
                                    <SecondaryInfoContainer>
                                        <IconWithText>
                                            <IconContainer>
                                                <MapIcon />
                                            </IconContainer>
                                            <Text>{card.city + ", " + card.state}</Text>
                                        </IconWithText>
                                        <IconWithText>
                                            <IconContainer>
                                                <PhoneIcon />
                                            </IconContainer>
                                            <Text as="a" href={"tel:" + card.phone} target="_blank">{getFormattedPhoneNumber(card.phone)}</Text>
                                        </IconWithText>
                                    </SecondaryInfoContainer>
                                    <SecondaryInfoContainer>
                                        <IconWithText>
                                            <IconContainer>
                                                <LocationIcon />
                                            </IconContainer>
                                            <Text as="a" href={handleDirections(card.latitude, card.longitude)} target="_blank" >{card.street}</Text>
                                        </IconWithText>
                                    </SecondaryInfoContainer>
                                </TextInfo>
                            </Link>
                            <PrimaryButton as="a" href={card.website_url} target="_blank">Visit Website</PrimaryButton>
                        </Card>
                    ))}
                </CardSlider>
            </Content>
        </Container>
    );
};

const handleDirections = (latitude, longitude) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
};

const getFormattedPhoneNumber = (phone) => {
    var cleaned = ('' + phone).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        var intlCode = match[1] ? '+1 ' : '';
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
};

const handlePhone = (phone) => {
    const telephoneNumber = getFormattedPhoneNumber(phone);
    const url = 'tel:' + telephoneNumber;
    window.open(url, '_blank');
};

