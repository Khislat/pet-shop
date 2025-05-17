// components/Footer.tsx
import React from "react";
import { Box, Container, Typography, Link, Grid } from "@mui/material";


const Footer: React.FC = () => {
  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom className="footerTitle">
              Bowow Pet Shop
            </Typography>
            <Typography variant="body2" color="textSecondary" className="footerText">
              Quality pet food and toys for your furry friends.
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom className="footerSubtitle">
              Quick Links
            </Typography>
            <Link href="/" className="footerLink">
              Home
            </Link>
            <br />
            <Link href="/products" className="footerLink">
              Products
            </Link>
            <br />
            <Link href="/about" className="footerLink">
              About
            </Link>
            <br />
            <Link href="/contact" className="footerLink">
              Contact
            </Link>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" gutterBottom className="footerSubtitle">
              Contact Us
            </Typography>
            <Typography variant="body2" color="textSecondary" className="footerText">
              Email: support@bowow.com
              <br />
              Phone: +1 (123) 456-7890
              <br />
              Address: 123 Pet Street, Pet City
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" gutterBottom className="footerSubtitle">
              Follow Us
            </Typography>
            <Box className="socialLinks">
              <Link href="#" className="footerLink">
                Facebook
              </Link>
              <br />
              <Link href="#" className="footerLink">
                Twitter
              </Link>
              <br />
              <Link href="#" className="footerLink">
                Instagram
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          className="copyRight"
        >
          &copy; {new Date().getFullYear()} Bowow Pet Shop. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
