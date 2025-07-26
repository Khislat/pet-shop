import React, { useState } from "react";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import withLayoutBasic from "../../../libs/components/layout/LayoutBasic";
const faqData = [
  {
    question: "Quality Services Provided At Affordable Rates ?",
    answer:
      "Mauris iaculis malesuada suscipit. Maecenas bibendum euismod neque vitae tincidunt. Nulla pharetra dui non placerat suscipit...",
  },
  {
    question: "Minimum Prices For The Maximum Output Advertise Anything ?",
    answer: "",
  },
  {
    question: "Advertising That Makes All The Difference  Leaping Over Boundaries?",
    answer:
      "Mauris iaculis malesuada suscipit. Maecenas bibendum euismod neque vitae tincidunt. Nulla pharetra dui non placerat suscipit. Vivamus egestas sodales urna at aliquet. Fusce molestie sapien ac lacus scelerisque, a commodo ligula aliquam. Quisque vel magna a dui aliquam iaculis non vel eros. Donec elementum odio eros.",
  },
  {
    question: "Get Ready To Laugh And Sparkle At The Same Time",
    answer: "",
  },
  {
    question: "Make Your Style Shine With Our Hilariously Unique Jewelry?",
    answer: "",
  },
  {
    question: "Chuckles And Charms: That's What Our Jewelry Offers ?",
    answer: "",
  },
  {
    question: "Accessorize With Wit And Our Funny Jewelry ?",
    answer: "",
  },
  {
    question: "Whimsical Jewelry For The Extraordinarily Cute?",
    answer: "",
  },
  {
    question: "Sweetness And Sparkles For Your Everyday Happiness ?",
    answer: "",
  },
];

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(2); // Only 3rd is open by default

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box className={"faqPage"}>
      <Container maxWidth="md">
        <Typography className={"subtitle"}>FREQUENTLY ASKED QUESTIONS</Typography>
        <Typography className={"title"}>HAVE ANY QUESTION? FIND ANSWER HERE</Typography>

        <Typography className={"sectionTitle"}>SHOPPING INFORMATION</Typography>

        <Stack spacing={1} className={"accordionList"}>
          {faqData.map((item, index) => (
            <Box key={index} className={"accordionItem"}>
              <Box className={"questionBox"} onClick={() => handleToggle(index)}>
                <Typography className={"question"}>{item.question}</Typography>
                <IconButton>
                  {openIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              {openIndex === index && item.answer && (
                <Typography className={"answer"}>{item.answer}</Typography>
              )}
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default withLayoutBasic(FaqPage) ;