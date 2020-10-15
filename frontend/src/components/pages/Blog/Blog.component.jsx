import React, { useState, useContext, useEffect } from "react";
import {
  Heading,
  Box,
  Flex,
  Grid,
  Image,
  Text,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/core";
import ReactMarkdown from "react-markdown";
import theme from "../../../themes/theme";
import Skeleton from "react-loading-skeleton";
import ChakraUIRenderer, { defaults } from "./BlogRender";
import userContext from "../../../context/userContext";
import "./Blog.styles.scss";
import { parseISO } from "date-fns";
import format from "date-fns/format";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthorMenu from "./../../common/AuthorMenu/AuthorMenu.component";

const Blog = (props) => {
  console.log("Props passed via link to blog are", props);
  const history = useHistory();
  const toast = useToast();
  const reqURL = `/blogs/${props.match.params.username}/${props.match.params.blogID}`;

  const { userData } = useContext(userContext);

  const [blog, setBlog] = useState("");
  const [image, setImageURL] = useState("");
  const [dateVar, setDateVar] = useState("");
  const [status, setStatus] = useState(false);

  const checkLoggedIn = () => {
    if (props.location.state.user.token === undefined) {
      console.log("No logged in detected.");
      setStatus(false);
    } else {
      console.log("yes the user is logged in ");
      setStatus(true);
    }
  };

  useEffect(() => {
    axios
      .get(reqURL)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        toast({
          title: "Some error occured.",
          description: "Please try reloading again.",
          isClosable: true,
        });
        history.push(reqURL);
      });
    checkLoggedIn();
  }, []);
  console.log("author of this blog is : ", blog.authorID);
  const handleImageLoad = () => {
    setImageURL("loaded");
  };

  const customMDTheme = {
    heading: (property) => {
      const { children } = property;
      return (
        <Heading as="h3" fontFamily={theme.fonts.body} fontSize="1.5rem">
          {children}
        </Heading>
      );
    },
    ...defaults,
  };
  console.log(status);

  return (
    <React.Fragment>
      <Box maxW={["98%", "100%", "99%"]} margin={["0 auto"]}>
        <Grid templateColumns={["1fr", "1fr", "1fr", "1fr 75ch 1fr"]} gap={2}>
          <Box w="100%" h="10" display={["none", "none", "none", "block"]} />
          <Box
            w="100%"
            margin={["1.4rem 0"]}
            id="container"
            backgroundColor={theme.colors.white}
            boxShadow="0 0 0 1px rgba(8,9,10,0.1)"
            borderRadius="10px"
          >
            <Box overflow="hidden">
              {blog.bannerURL !== "" ? (
                <Image
                  src={blog.bannerURL}
                  onLoad={handleImageLoad}
                  w="100%"
                  height="280px"
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
                fontSize={["2.35rem", "3rem"]}
                lineHeight={["1.25"]}
                marginTop={["2rem", "1.7rem", "1.4rem", "1.6rem"]}
                padding={[""]}
                fontFamily={theme.fonts.body}
              >
                {blog.title || <Skeleton />}
              </Heading>
              <Flex padding="1rem 0" alignItems="center">
                <Box
                  width="40px"
                  height="40px"
                  borderRadius="50%"
                  overflow="hidden"
                >
                  <Image src={blog.avatar ? blog.avatar : ""} />
                </Box>
                <Box marginLeft="1rem">
                  <Flex
                    fontFamily={theme.fonts.body}
                    justifyContent="space-between"
                  >
                    <Box>
                      <Text>{blog.author} • </Text>
                      <Text color="#64707D">&nbsp;{dateVar}</Text>
                    </Box>
                    {status
                      ? blog.authorID === props.location.state.user.user.id
                        ? "You are owner"
                        : "you are not owner"
                      : "guest user"}
                    {/* {user ? (
                      status && blog.authorID === user.id ? (
                        <Box>
                          <Button backgroundColor={theme.colors.danger}>
                            Delete
                          </Button>
                        </Box>
                      ) : (
                        "Not logged in to delete"
                      )
                    ) : (
                      ""
                    )} */}
                  </Flex>
                </Box>
              </Flex>
              <Box padding={[""]}>
                <ReactMarkdown
                  renderers={ChakraUIRenderer(customMDTheme)}
                  source={blog.content}
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
