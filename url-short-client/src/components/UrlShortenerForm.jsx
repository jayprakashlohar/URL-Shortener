import { useState } from "react";
import axios from "axios";
import { Box, Heading, Input, Button, Text } from "@chakra-ui/react";

function UrlShortenerForm() {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://url-shortener-server-production-8f5c.up.railway.app/api/url",
        {
          url,
        }
      );
      setShortId(response.data.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Box shadow="lg" textAlign="center" p="15px">
        <Heading>URL Shortener</Heading>
      </Box>
      <Box w="40%" m="auto" mt="2rem">
        <form onSubmit={handleFormSubmit}>
          <Box display="flex">
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
            />
            <Button type="submit">Shorten</Button>
          </Box>
        </form>
        {shortId && (
          <Box>
            <Text fontWeight="bold">Your shortened URL:</Text>
            <a
              href={`https://url-shortener-server-production-8f5c.up.railway.app/api/${shortId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`https://${shortId}`}
              {/* {`http://localhost:8100/api/${shortId}`} */}
            </a>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default UrlShortenerForm;
