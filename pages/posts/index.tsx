import { Box, Divider, List, ListItem, Select } from "@chakra-ui/react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { useState } from "react";
import { Post, User } from "../../types";

const Posts: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [posts, setPosts] = useState<Post[]>(props.posts);
  const users: User[] = props.users;
  const userOptions = users.map((user) => ({
    label: user.name,
    value: user.id,
  }));
  const handleFilter = async (userId: number) => {
    const resPosts = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    setPosts(await resPosts.json());
  };
  return (
    <Box w={"full"} h={"fit-content"}>
      <Select onChange={(e) => handleFilter(Number(e.target.value))}>
        {userOptions.map((userOption) => (
          <option key={userOption.value} value={userOption.value}>
            {userOption.value} -{userOption.label}
          </option>
        ))}
      </Select>
      <Divider />
      <List>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const resPosts = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await resPosts.json();
  const resUsers = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await resUsers.json();
  return { props: { posts: posts, users: users } };
};

export default Posts;
