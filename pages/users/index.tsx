import {
  Box,
  Divider,
  Flex,
  Input,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { useState } from "react";
import { User } from "../../types";

const Posts: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [users, setUsers] = useState<User[]>(props.users);

  const handleSearch = async (search: string) => {
    const resUsers = await fetch(
      `https://63438d663f83935a78552378.mockapi.io/user?search=${search}`
    );
    setUsers(await resUsers.json());
  };

  return (
    <Box w={"full"} h={"fit-content"}>
      <Input
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search"
      />
      <Divider />
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <Link href={`/users/${user.id}`}>
              <Flex
                borderColor={"indigo"}
                borderWidth={2}
                borderRadius={"xl"}
                m={2}
                p={4}
                alignItems={"center"}
                gap={2}
              >
                <Text>
                  {user.name}
                  {""}
                </Text>
                <Text as={"small"} color={"orange"}>
                  @{user.username}
                </Text>
              </Flex>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const resUsers = await fetch(
    "https://63438d663f83935a78552378.mockapi.io/user"
  );
  const users = await resUsers.json();
  return { props: { users: users } };
};

export default Posts;
