import React, { useState, useContext,useEffect } from "react";
import { Heading, Box, Flex, Grid, Image, Text } from "@chakra-ui/core";
// import ChakraUIRenderer, { defaults } from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import theme from "../../../themes/theme";
import Skeleton from "react-loading-skeleton";
import ChakraUIRenderer, { defaults } from "./BlogRender";
import userContext from "../../../context/userContext";
import "./Blog.styles.scss";
import { parseISO } from "date-fns";
import format from "date-fns/format";

const Blog = ({
  location: {
    state: {
      props: { data },
    },
  },
}) => {
  const { userData } = useContext(userContext);
  const fallbackImageURL = "http://unsplash.it/600/600";
  
  const [dateVar, setDateVar] = useState("");

  useEffect(() => {
    
    var parsedDate = parseISO(data.date);
    var result = format(parsedDate, "MMM yyyy");
    console.log(result);
    setDateVar(result);
  },[]);


  const [image, setImageURL] = useState("");
  const handleImageLoad = () => {
    setImageURL("loaded");
  };

  const customMDTheme = {
    heading: (props) => {
      const { children } = props;
      return (
        <Heading as="h3" fontFamily={theme.fonts.body} fontSize="1.5rem">
          {children}
        </Heading>
      );
    },
    ...defaults,
  };

  return (
    <React.Fragment>
      <Box maxW={["98%", "100%", "99%"]} margin={["0 auto"]}>
        <Grid templateColumns={["1fr", "1fr", "1fr", "1fr 75ch 1fr"]} gap={2}>
          <Box w="100%" h="10" display={["none", "none", "none", "block"]} />
          {/* Main Blog Column */}
          <Box
            w="100%"
            margin={["1.4rem 0"]}
            id="container"
            backgroundColor={theme.colors.white}
            boxShadow="0 0 0 1px rgba(8,9,10,0.1)"
            borderRadius="10px"
          >
            <Box overflow="hidden">
              {/* {!image && <Skeleton height="280px" width="100%" />} */}
              {data.bannerURL !== "" ? (
                <Image
                  src={data.bannerURL}
                  // onLoad={handleImageLoad}
                  w="100%"
                  maxH="280px"
                  objectFit="cover"
                  borderRadius="5px"
                ></Image>
              ) : (
                ""
              )}
            </Box>

            <Box
              padding={["0 0.3rem", "0 .7rem", "0 3rem"]}
              className="md-content"
            >
              <Heading
                // fontSize={["1.875rem", "2.25rem", "3rem"]}
                fontSize={["2.35rem", "3rem"]}
                lineHeight={["1.25"]}
                marginTop={["2rem", "1.7rem", "1.4rem", "1.6rem"]}
                padding={[""]}
                fontFamily={theme.fonts.body}
              >
                {data.title || <Skeleton />}
              </Heading>
              {/* User data here */}
              <Flex padding="1rem 0" alignItems="center">
                <Box
                  width="40px"
                  height="40px"
                  borderRadius="50%"
                  overflow="hidden"
                >
                  <Image src={data.avatar ? data.avatar : ""} />
                </Box>
                <Box marginLeft="1rem">
                  <Text fontFamily={theme.fonts.body}>{data.authorID} • {dateVar} </Text>
                  
                </Box>
              </Flex>
              <Box padding={[""]}>
                <ReactMarkdown
                  renderers={ChakraUIRenderer(customMDTheme)}
                  source={data.content}
                  escapeHtml={false}
                />
              </Box>
            </Box>
          </Box>
          <Box w="100%" h="10" display={["none", "none", "none", "block"]} />
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Blog;
