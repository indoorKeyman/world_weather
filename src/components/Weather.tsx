import { motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWater,
  faWind,
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { fetchWeather } from "../api";
import { useForm } from "react-hook-form";
import Rain from "../images/rain.png";
import Clouds from "../images/clouds.png";
import Clear from "../images/clear.png";
import Few_clouds from "../images/few_clouds.png";
import Mist from "../images/mist.png";
import Snow from "../images/snow.png";
import { useEffect, useState } from "react";

const Container = styled.div`
  background-color: #161a30;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainBox = styled(motion.div)`
  background-color: white;
  height: 100px;
  width: 400px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 28px 32px;
  overflow: hidden;
`;

const SearchBox = styled.div`
  width: 100%;
  height: min-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const SearchInput = styled.input`
  color: #31304d;
  width: 80%;
  font-size: 24px;
  font-weight: 500;
  text-transform: uppercase;
  padding-left: 32px;
  &::placeholder {
    font-size: 20px;
    font-weight: 500;
    color: #31304d;
    text-transform: capitalize;
  }
`;
const SearchBtn = styled.button`
  cursor: pointer;
  width: 50px;
  height: 50px;
  color: #31304d;
  background: #b6bbc4;
  border-radius: 50%;
  font-size: 22px;
  &:hover {
    color: #b6bbc4;
    background: #31304d;
  }
  transition: 0.4s ease;
`;

const NotFoundBox = styled.div`
  margin-top: 50px;
`;

const NotFoundImage = styled.div`
  text-align: center;
  font-size: 160px;
  padding-bottom: 40px;
  height: min-content;
`;
const NotFoundP = styled.p`
  width: 100%;
  text-align: center;
`;

const WeahterBox = styled.div`
  text-align: center;
`;
const WeahterImg = styled.img`
  width: 60%;
  margin-top: 30px;
`;
const Temperature = styled.p`
  position: relative;
  color: #31304d;
  font-size: 4rem;
  font-weight: 800;
  margin-top: 30px;
  margin-left: -16px;
`;
const TemperatureS = styled.span`
  position: absolute;
  margin-left: 4px;
  font-size: 1.5rem;
`;
const Description = styled.p`
  color: #31304d;
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;
  margin-top: 8px;
`;

const WeatherDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Humidity = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100px;
  padding-left: 20px;
  justify-content: flex-start;
  font-size: 26px;
  color: #31304d;
  margin-right: 10px;
`;

const HumidityR = styled.div`
  margin-left: 8px;
`;

const HumidityS = styled.span`
  color: #31304d;
  font-size: 22px;
  font-weight: 500;
`;
const HumidityP = styled.p`
  font-size: 14px;
  color: #31304d;
  font-weight: 500;
`;
const WindSpeed = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100px;
  padding-right: 20px;
  justify-content: flex-end;
  font-size: 26px;
  color: #31304d;
  margin-right: 10px;
`;

const WindSpeedR = styled.div`
  margin-left: 8px;
`;

const WindSpeedS = styled.span`
  color: #31304d;
  font-size: 22px;
  font-weight: 500;
`;

const WindSpeedSU = styled.span`
  color: #31304d;
  font-size: 16px;
  font-weight: 500;
`;

const WindSpeedP = styled.p`
  font-size: 14px;
  color: #31304d;
  font-weight: 500;
`;

interface Iweather {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];

  main: {
    humidity: number;
    temp: number;
  };

  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  cod: string;
}

type Inputs = {
  ct: string;
};

function Weather() {
  const {
    register,
    watch,
    // formState: { errors },
  } = useForm<Inputs>();

  const { data, refetch } = useQuery<Iweather>(
    "weather",
    () => fetchWeather(watch().ct),
    { enabled: false }
  );

  const [mainBoxHeight, setMainBoxHeight] = useState(100);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (data) {
      if (data.cod === "400" || data.cod === "404" || data === undefined) {
        setMainBoxHeight(400);
      } else {
        setMainBoxHeight(600);

        switch (data.weather[0].main) {
          case "Clear":
            setImgSrc(Clear);
            break;

          case "Clouds":
            setImgSrc(Clouds);
            break;
          case "Mist":
            setImgSrc(Mist);
            break;
          case "Rain":
            setImgSrc(Rain);
            break;
          case "Few_clouds":
            setImgSrc(Few_clouds);
            break;
          case "Snow":
            setImgSrc(Snow);
            break;
          default:
            setImgSrc("");
            break;
        }
      }
    }
  }, [data]);

  const mainboxVariants = {
    start: {
      opacity: 0,
      scale: 0,
    },
    end: {
      opacity: 1,
      scale: 1,
      height: mainBoxHeight,
      transition: {
        duration: 0.8,
      },
    },
  };

  //정규표현식 손봐야함.
  return (
    <>
      <Container>
        <MainBox variants={mainboxVariants} initial="start" animate="end">
          <SearchBox>
            <FontAwesomeIcon icon={faLocationDot} />
            <SearchInput
              {...register("ct")}
              onKeyDown={(e) => (e.key === "Enter" ? refetch() : null)}
              placeholder="Enter your location"
            />

            <SearchBtn
              onClick={() => {
                console.log("리패치");
                refetch();
              }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </SearchBtn>
          </SearchBox>

          {data?.cod === "400" || data?.cod === "404" || data === undefined ? (
            <NotFoundBox>
              <NotFoundImage>😢</NotFoundImage>
              <NotFoundP>Invalid location</NotFoundP>
            </NotFoundBox>
          ) : (
            <>
              <WeahterBox>
                <WeahterImg src={imgSrc} alt="weather image" />

                <Temperature>
                  {parseInt(data.main.temp + "") - 275}
                  <TemperatureS>°C</TemperatureS>
                </Temperature>
                <Description>{data?.weather[0].description}</Description>
              </WeahterBox>

              <WeatherDetail>
                <Humidity>
                  <FontAwesomeIcon icon={faWater} color="#31304d" />
                  <HumidityR>
                    <HumidityS>{data.main.humidity}%</HumidityS>
                    <HumidityP>Humidity</HumidityP>
                  </HumidityR>
                </Humidity>

                <WindSpeed>
                  <FontAwesomeIcon icon={faWind} color="#31304d" />
                  <WindSpeedR>
                    <WindSpeedS>
                      {data.wind.speed}
                      <WindSpeedSU>Km/h</WindSpeedSU>
                    </WindSpeedS>
                    <WindSpeedP>WindSpeed</WindSpeedP>
                  </WindSpeedR>
                </WindSpeed>
              </WeatherDetail>
            </>
          )}
        </MainBox>
      </Container>
    </>
  );
}

export default Weather;
