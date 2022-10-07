import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Post: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <Box>{id}</Box>;
};

export default Post;
