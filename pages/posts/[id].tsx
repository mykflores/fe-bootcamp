import { Box, Divider, Heading, List, ListItem, Text } from "@chakra-ui/react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { Comment, Post } from "../../types";

const Thread: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const post: Post = props.post;
  const comments: Comment[] = props.comments;
  return (
    <Box>
      <Text>#{post.id}</Text>
      <Heading>{post.title}</Heading>
      <Text fontSize={"xl"}>{post.body}</Text>
      <Divider />
      <Text fontWeight={"bold"}>Comments</Text>
      <List px={4}>
        {comments.map((comment) => (
          <ListItem key={comment.id} py={2}>
            <Box>
              <Text fontWeight={"semibold"}>{comment.name}</Text>
              <Text>{comment.email}</Text>
              <Text fontStyle={"italic"}>{comment.body}</Text>
            </Box>
            <Divider />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const resPost = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const resComments = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  const post = await resPost.json();
  const comments = await resComments.json();
  return { props: { post: post, comments: comments } };
};

export default Thread;
