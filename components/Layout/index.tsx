import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";

interface Page {
  name: string;
  url: string;
}

const PAGES: Page[] = [
  { name: "Home", url: "/" },
  { name: "Users", url: "/users" },
  { name: "Auth", url: "/auth" },
];

export const Layout: React.FC<any> = ({ children }) => {
  return (
    <>
      <Head>
        <title>FE BOOTCAMP</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w={"full"} h={"100vh"}>
        <Box
          w={"20vw"}
          h={"full"}
          bg={"indigo"}
          color={"white"}
          p={4}
          position={"fixed"}
          top={0}
        >
          <Text color={"orange"} fontSize={"3xl"} fontWeight={"extrabold"}>
            NAVIGATION
          </Text>
          <List fontSize={"xl"}>
            {PAGES.map((page) => (
              <ListItem key={page.name} fontWeight={"semibold"}>
                <Link href={page.url}>{page.name}</Link>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box w={"80vw"} ml={"20vw"} bg={"white"} p={4}>
          {children}
        </Box>
      </Flex>
    </>
  );
};
